#!/usr/bin/env node

// Test script to verify the project works after cloning
const { execSync } = require('child_process');
const fs = require('fs');

console.log('🧪 Testing DeepSeek CLI after clone...\n');

try {
  // Check if package.json exists
  if (!fs.existsSync('package.json')) {
    throw new Error('package.json not found');
  }

  // Check if src directory exists
  if (!fs.existsSync('src')) {
    throw new Error('src directory not found');
  }

  console.log('✅ Project structure looks good');

  // Try to build
  console.log('\n🔨 Building project...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build successful');

  // Test basic CLI commands
  console.log('\n🧪 Testing CLI commands...');
  
  console.log('\n📋 Testing --help:');
  execSync('node dist/index.js --help', { stdio: 'inherit' });

  console.log('\n🔧 Testing config --show:');
  execSync('node dist/index.js config --show', { stdio: 'inherit' });

  console.log('\n✅ All tests passed! The project is ready to use.');
  console.log('\n🚀 Next steps:');
  console.log('1. Set your API key: deepseek config --set-api-key "your-key"');
  console.log('2. Try interactive mode: deepseek interactive');
  console.log('3. Or send a message: deepseek chat "Hello!"');

} catch (error) {
  console.error('\n❌ Test failed:', error.message);
  process.exit(1);
}