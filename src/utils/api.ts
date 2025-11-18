import axios from 'axios';
import { DeepSeekRequest, DeepSeekResponse, DeepSeekError } from '../types';
import { getConfig } from './config';

export class DeepSeekAPI {
  private baseURL = 'https://api.deepseek.com/v1';
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || getConfig().apiKey || '';
    if (!this.apiKey) {
      throw new Error('DeepSeek API key not found. Please set it using: deepseek config --set-api-key <your-key>');
    }
  }

  async chat(request: DeepSeekRequest): Promise<DeepSeekResponse> {
    try {
      const response = await axios.post(`${this.baseURL}/chat/completions`, request, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        timeout: 60000, // Increased timeout to 60 seconds
      });

      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        const apiError = error.response.data as DeepSeekError;
        throw new Error(`DeepSeek API Error: ${apiError.error.message}`);
      }
      throw new Error(`Network Error: ${error.message}`);
    }
  }

  async streamChat(request: DeepSeekRequest, onChunk: (chunk: string) => void): Promise<void> {
    try {
      const response = await axios.post(`${this.baseURL}/chat/completions`, {
        ...request,
        stream: true,
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        responseType: 'stream',
        timeout: 60000, // Increased timeout to 60 seconds
      });

      let buffer = '';
      response.data.on('data', (chunk: Buffer) => {
        buffer += chunk.toString();
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

      } catch (e) {
          if (line.startsWith('data: ') && line !== 'data: [DONE]') {
            try {
              const data = JSON.parse(line.slice(6));
              const content = data.choices?.[0]?.delta?.content;
              if (content) {
                onChunk(content);
              }
            } catch (e) {
              // Ignore JSON parse errors for incomplete chunks
            }
          }
        }
      });

      return new Promise((resolve, reject) => {
        response.data.on('end', resolve);
        response.data.on('error', reject);
      });
    } catch (error: any) {
      if (error.response?.data) {
        const apiError = error.response.data as DeepSeekError;
        throw new Error(`DeepSeek API Error: ${apiError.error.message}`);
      }
      throw new Error(`Network Error: ${error.message}`);
    }
  }
}