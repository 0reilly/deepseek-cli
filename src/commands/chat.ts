import { DeepSeekAPI } from '../utils/api';
import { readFileContent, isTextFile } from '../utils/file';
import { getConfig } from '../utils/config';
import { ChatOptions } from '../types';
import chalk from 'chalk';
import ora from 'ora';

export async function chatCommand(message: string, options: ChatOptions) {
  try {
    const config = getConfig();
    const api = new DeepSeekAPI();

    let userMessage = message;

    // Read from file if specified
    if (options.file) {
      if (!isTextFile(options.file)) {
        console.log(chalk.yellow('Warning: File may not be a text file. Attempting to read anyway...'));
      }
      userMessage = readFileContent(options.file);
    }

    // If no message provided and no file, show help
    if (!userMessage) {
      console.log(chalk.red('Error: No message provided. Use --help for usage information.'));
      process.exit(1);
    }

    const messages = [];

    // Add system prompt if provided
    if (options.system) {
      messages.push({
        role: 'system' as const,
        content: options.system,
      });
    }

    // Add user message
    messages.push({
      role: 'user' as const,
      content: userMessage,
    });

    const request = {
      model: options.model || config.model || 'deepseek-chat',
      messages,
      temperature: options.temperature || config.temperature,
      max_tokens: options.maxTokens || config.maxTokens,
      stream: true, // Enable streaming by default
    };

    console.log('\n' + chalk.blue('🤖 DeepSeek:') + '\n');

    let fullResponse = '';
    let hasStarted = false;

    try {
      await api.streamChat(request, (chunk: string) => {
        if (!hasStarted) {
          hasStarted = true;
        }
        process.stdout.write(chunk);
        fullResponse += chunk;
      });

      // Add newline after streaming completes
      console.log('\n');

      // Estimate tokens (rough approximation)
      const estimatedTokens = Math.ceil(fullResponse.length / 4);
      console.log(chalk.gray(`Tokens: ~${estimatedTokens}`));

    } catch (error: any) {
      // If streaming fails, fall back to regular chat
      console.log(chalk.yellow('\nStreaming failed, falling back to regular request...'));
      
      const spinner = ora('Thinking...').start();
      
      try {
        const response = await api.chat({
          ...request,
          stream: false,
        });
        spinner.stop();

        const assistantMessage = response.choices[0]?.message?.content;
        
        if (assistantMessage) {
          console.log('\n' + chalk.blue('🤖 DeepSeek:') + '\n');
          console.log(assistantMessage);
          console.log('\n' + chalk.gray(`Tokens: ${response.usage?.total_tokens || 'N/A'}`));
        } else {
          console.log(chalk.red('Error: No response received from DeepSeek API'));
        }
      } catch (fallbackError: any) {
        spinner.stop();
        console.log(chalk.red(`Error: ${fallbackError.message}`));
        process.exit(1);
      }
    }
  } catch (error: any) {
    console.log(chalk.red(`Error: ${error.message}`));
    process.exit(1);
  }
}