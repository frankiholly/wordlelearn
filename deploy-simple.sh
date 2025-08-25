#!/bin/bash
# Simple deployment script - just uses GitHub Actions
set -e

echo "=== Simple Wordle Deployment ==="
echo "This script just triggers GitHub Actions deployment"
echo ""

# Setup NVM for consistent Node.js version
echo "Setting up NVM environment..."
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "Switching to LTS Node.js version..."
nvm use --lts || nvm use 22 || nvm install 22

# Test build locally first
echo "Testing build locally..."
npm run build

echo ""
echo "✅ Build successful!"
echo ""
echo "🚀 To deploy:"
echo "   1. Commit your changes: git add . && git commit -m 'Deploy update'"
echo "   2. Push to GitHub: git push"
echo "   3. GitHub Actions will automatically deploy to GitHub Pages"
echo ""
echo "📍 Check deployment status: https://github.com/frankiholly/wordlelearn/actions"
echo "🌐 Live site: https://frankiholly.github.io/wordlelearn"
echo ""
