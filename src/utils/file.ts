import { readFileSync } from 'fs';
import { join } from 'path';

export function readFileContent(filePath: string): string {
  try {
    const content = readFileSync(filePath, 'utf-8');
    return content;
  } catch (error: any) {
    throw new Error(`Failed to read file ${filePath}: ${error.message}`);
  }
}

export function isTextFile(filePath: string): boolean {
  const textExtensions = [
    '.txt', '.md', '.json', '.js', '.ts', '.jsx', '.tsx', '.py', '.java', '.cpp', '.c', '.h',
    '.html', '.css', '.scss', '.less', '.xml', '.yaml', '.yml', '.toml', '.ini', '.cfg',
    '.sh', '.bash', '.zsh', '.fish', '.ps1', '.bat', '.cmd', '.sql', '.r', '.go', '.rs',
    '.php', '.rb', '.pl', '.pm', '.lua', '.swift', '.kt', '.scala', '.clj', '.ex', '.exs'
  ];
  
  const extension = filePath.toLowerCase().slice(filePath.lastIndexOf('.'));
  return textExtensions.includes(extension);
}