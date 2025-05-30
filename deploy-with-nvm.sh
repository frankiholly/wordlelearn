#!/bin/bash
set -e  # Exit immediately if a command fails

echo "Setting up NVM environment..."
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "Switching to LTS Node.js version..."
nvm use --lts

echo "Building the application..."
npm run build

echo "Deploying to GitHub Pages..."
npx gh-pages -d build

echo "Deployment complete!"
