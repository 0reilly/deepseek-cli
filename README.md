# DeepSeek CLI Agent

A powerful command-line interface for interacting with DeepSeek V3.2 AI models. This CLI tool allows you to chat with DeepSeek AI, process files, and manage conversations directly from your terminal.

## Features

- 🤖 **Interactive Chat Mode**: Have natural conversations with DeepSeek AI
- 📁 **File Processing**: Read and process text files directly
- ⚙️ **Configuration Management**: Save your API key and preferences
- 🔄 **Conversation History**: Maintain context across multiple messages
- 🎨 **Beautiful Output**: Colored and formatted responses
- 📊 **Token Usage**: Track your API usage

## Installation

### Prerequisites

- Node.js 16.0 or higher
- A DeepSeek API key

### Install from Source

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd deepseek-cli
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Link globally (optional):
   ```bash
   npm link
   ```

## Configuration

Before using the CLI, you need to set up your DeepSeek API key:

```bash
# Set your API key
deepseek config --set-api-key "your-api-key-here"

# Set default model (optional)
deepseek config --set-model "deepseek-chat"

# Set default temperature (optional, 0.0-1.0)
deepseek config --set-temperature 0.7

# Set default max tokens (optional)
deepseek config --set-max-tokens 2048

# View current configuration
deepseek config --show
```

## Usage

### Interactive Mode (Default)

Start an interactive chat session:

```bash
deepseek
# or
deepseek interactive
```

With custom options:
```bash
deepseek --model deepseek-chat --temperature 0.8 --system "You are a helpful assistant"
```

### Single Message

Send a single message to DeepSeek:

```bash
deepseek chat "Hello, how are you?"
```

With options:
```bash
deepseek chat "Explain quantum computing" --model deepseek-chat --temperature 0.5
```

### File Processing

Process content from a file:

```bash
deepseek chat --file document.txt
```

### System Prompts

Use a custom system prompt:

```bash
deepseek chat "Write a poem" --system "You are a creative poet"
```

## Examples

### Basic Chat
```bash
deepseek chat "What is the capital of France?"
```

### Code Review
```bash
deepseek chat --file code.js --system "You are a code reviewer. Provide feedback on this code."
```

### Creative Writing
```bash
deepseek chat "Write a short story about a robot" --temperature 0.9
```

### Technical Explanation
```bash
deepseek chat "Explain how neural networks work" --model deepseek-chat --max-tokens 1000
```

## Available Models

- `deepseek-chat` - General purpose chat model
- `deepseek-coder` - Code generation and programming
- Other DeepSeek models as available

## Configuration File

The CLI stores configuration in `~/.config/configstore/deepseek-cli.json` on Linux/macOS or `%APPDATA%/configstore/deepseek-cli.json` on Windows.

## Environment Variables

You can also set the API key via environment variable:

```bash
export DEEPSEEK_API_KEY="your-api-key-here"
```

## Development

### Building from Source

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Run in development mode
npm run dev
```

### Testing

```bash
npm test
```

## Troubleshooting

### API Key Issues
- Make sure your API key is valid and has sufficient credits
- Check that you've set the API key using `deepseek config --set-api-key`

### Network Issues
- Verify your internet connection
- Check if the DeepSeek API is accessible from your location

### Installation Issues
- Ensure you have Node.js 16.0 or higher
- Try clearing npm cache: `npm cache clean --force`

## License

MIT License - see LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Search existing GitHub issues
3. Create a new issue with detailed information

---

Happy chatting with DeepSeek! 🚀