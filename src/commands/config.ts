import { setConfig, showConfig } from '../utils/config';
import chalk from 'chalk';

export async function configCommand(options: any) {
  try {
    if (options.setApiKey) {
      await setConfig({ apiKey: options.setApiKey });
      console.log(chalk.green('API key set successfully!'));
    }

    if (options.setModel) {
      await setConfig({ model: options.setModel });
      console.log(chalk.green(`Default model set to: ${options.setModel}`));
    }

    if (options.setTemperature) {
      if (options.setTemperature < 0 || options.setTemperature > 1) {
        console.log(chalk.red('Error: Temperature must be between 0.0 and 1.0'));
        process.exit(1);
      }
      await setConfig({ temperature: options.setTemperature });
      console.log(chalk.green(`Default temperature set to: ${options.setTemperature}`));
    }

    if (options.setMaxTokens) {
      if (options.setMaxTokens < 1) {
        console.log(chalk.red('Error: Max tokens must be at least 1'));
        process.exit(1);
      }
      await setConfig({ maxTokens: options.setMaxTokens });
      console.log(chalk.green(`Default max tokens set to: ${options.setMaxTokens}`));
    }

    if (options.show) {
      const config = await showConfig();
      console.log(chalk.blue('\nCurrent Configuration:'));
      console.log(chalk.gray(`  API Key: ${config.apiKey ? '••••••••' + config.apiKey.slice(-4) : 'Not set'}`));
      console.log(chalk.gray(`  Model: ${config.model}`));
      console.log(chalk.gray(`  Temperature: ${config.temperature}`));
      console.log(chalk.gray(`  Max Tokens: ${config.maxTokens}`));
    }

    // If no options provided, show help
    if (!options.setApiKey && !options.setModel && !options.setTemperature && !options.setMaxTokens && !options.show) {
      console.log(chalk.yellow('Use --help to see available configuration options.'));
    }
  } catch (error: any) {
    console.log(chalk.red(`Error: ${error.message}`));
    process.exit(1);
  }
}