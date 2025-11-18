export interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface DeepSeekRequest {
  model: string;
  messages: DeepSeekMessage[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

export interface DeepSeekResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: DeepSeekMessage;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface DeepSeekError {
  error: {
    message: string;
    type: string;
    code: string;
  };
}

export interface Config {
  apiKey?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface ChatOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  file?: string;
  system?: string;
}