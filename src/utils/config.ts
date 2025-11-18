import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import { Config } from '../types';

const CONFIG_DIR = join(homedir(), '.config', 'deepseek-cli');
const CONFIG_FILE = join(CONFIG_DIR, 'config.json');

function ensureConfigDir(): void {
  if (!existsSync(CONFIG_DIR)) {
    mkdirSync(CONFIG_DIR, { recursive: true });
  }
}

function readConfigFile(): Partial<Config> {
  try {
    if (existsSync(CONFIG_FILE)) {
      const content = readFileSync(CONFIG_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (error) {
    // If file is corrupted, return empty config
    console.error('Warning: Config file corrupted, using defaults');
  }
  return {};
}

function writeConfigFile(config: Partial<Config>): void {
  ensureConfigDir();
  writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
}

export function getConfig(): Config {
  const fileConfig = readConfigFile();
  return {
    apiKey: fileConfig.apiKey || process.env.DEEPSEEK_API_KEY || '',
    model: fileConfig.model || 'deepseek-chat',
    temperature: fileConfig.temperature || 0.7,
    maxTokens: fileConfig.maxTokens || 2048,
  };
}

export function setConfig(newConfig: Partial<Config>): void {
  const currentConfig = readConfigFile();
  const updatedConfig = { ...currentConfig, ...newConfig };
  writeConfigFile(updatedConfig);
}

export function showConfig(): Config {
  return getConfig();
}