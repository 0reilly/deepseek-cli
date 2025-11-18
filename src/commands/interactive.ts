import inquirer from 'inquirer';
import { DeepSeekAPI } from '../utils/api';
import { getConfig } from '../utils/config';
import { ChatOptions, DeepSeekMessage } from '../types';
import chalk from 'chalk';
import ora from 'ora';
export async function interactiveCommand(options: ChatOptions) {
  try {
    const config = getConfig();
    const api = new DeepSeekAPI();
    console.log(chalk.blue('🤖 DeepSeek CLI - Interactive Mode'));
    console.log(chalk.gray('Type "exit" or "quit" to end the conversation.\n'));

    const messages: DeepSeekMessage[] = [];

    // Add system prompt if provided
    if (options.system) {
      messages.push({
        role: 'system',
        content: options.system,
      });
      console.log(chalk.green('System prompt set.\n'));
    }

    while (true) {
      const { userInput } = await inquirer.prompt([
        {
          type: 'input',
          name: 'userInput',
          message: chalk.cyan('You:'),
          validate: (input: string) => {
            if (input.trim().length === 0) {
              return 'Please enter a message';
            }
            return true;
          },
        },
      ]);

      const trimmedInput = userInput.trim();

      // Check for exit commands
      if (['exit', 'quit', 'bye'].includes(trimmedInput.toLowerCase())) {
        console.log(chalk.yellow('\nGoodbye! 👋'));
        break;
      }

      // Add user message to conversation history
      messages.push({
        role: 'user',
        content: trimmedInput,
      });

      const request = {
        model: options.model || config.model || 'deepseek-chat',
        messages,
        temperature: options.temperature || config.temperature,
        max_tokens: options.maxTokens || config.maxTokens,
        stream: false,
      };

      const spinner = ora('Thinking...').start();

      try {
        const response = await api.chat(request);
        spinner.stop();

        const assistantMessage = response.choices[0]?.message?.content;
        
        if (assistantMessage) {
          console.log('\n' + chalk.blue('🤖 DeepSeek:') + '\n');
          console.log(assistantMessage);
          console.log(chalk.gray(`\nTokens: ${response.usage?.total_tokens || 'N/A'}\n`));

          // Add assistant response to conversation history
          messages.push({
            role: 'assistant',
            content: assistantMessage,
          });
        } else {
          console.log(chalk.red('Error: No response received from DeepSeek API'));
        }
      } catch (error: any) {
        spinner.stop();
        console.log(chalk.red(`Error: ${error.message}`));
        
        // Remove the last user message if there was an error
        messages.pop();
      }
    }
  } catch (error: any) {
    console.log(chalk.red(`Error: ${error.message}`));
    process.exit(1);
  }
}