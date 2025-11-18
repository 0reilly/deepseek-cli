#!/usr/bin/env node

import { Command } from 'commander';
import { chatCommand } from './commands/chat';
import { configCommand } from './commands/config';

const program = new Command();

program
  .name('deepseek')
  .description('CLI agent for DeepSeek V3.2 API')
  .version('1.0.0');

// Chat command
program
  .command('chat')
  .description('Chat with DeepSeek AI')
  .option('-m, --model <model>', 'Model to use (default: deepseek-chat)')
  .option('-t, --temperature <temperature>', 'Temperature for response (0.0-1.0)', parseFloat)
  .option('--max-tokens <tokens>', 'Maximum tokens in response', parseInt)
  .option('-f, --file <file>', 'Read input from file')
  .option('-s, --system <prompt>', 'System prompt to use')
  .argument('[message]', 'Message to send to DeepSeek')
  .action(chatCommand);

// Config command
program
  .command('config')
  .description('Manage configuration')
  .option('--set-api-key <key>', 'Set DeepSeek API key')
  .option('--set-model <model>', 'Set default model')
  .option('--set-temperature <temp>', 'Set default temperature', parseFloat)
  .option('--set-max-tokens <tokens>', 'Set default max tokens', parseInt)
  .option('--show', 'Show current configuration')
  .action(configCommand);

// Interactive mode (default)
program
  .command('interactive', { isDefault: true })
  .description('Start interactive chat mode')
  .option('-m, --model <model>', 'Model to use (default: deepseek-chat)')
  .option('-t, --temperature <temperature>', 'Temperature for response (0.0-1.0)', parseFloat)
  .option('--max-tokens <tokens>', 'Maximum tokens in response', parseInt)
  .option('-s, --system <prompt>', 'System prompt to use')
  .action(async (options) => {
    const { interactiveCommand } = await import('./commands/interactive');
    await interactiveCommand(options);
  });

program.parse();