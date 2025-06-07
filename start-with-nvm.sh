#!/bin/bash
set -e  # Exit immediately if a command fails

echo "=== Wordle Extreme Development Server ==="
echo "Setting up NVM environment..."
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "Switching to LTS Node.js version..."
nvm use --lts || nvm use 22 || nvm install 22

echo "Starting development server..."
npx react-scripts start
