#!/bin/bash

# Check if nvm is available
if [ -s "$HOME/.nvm/nvm.sh" ]; then
  source "$HOME/.nvm/nvm.sh"
  echo "NVM is available, using it to set Node version..."
  
  # Use Node.js version 22 (or whatever version is specified in .nvmrc if it exists)
  if [ -f ".nvmrc" ]; then
    echo "Using Node.js version specified in .nvmrc"
    nvm use
  else
    echo "Setting Node.js version to 22"
    nvm use 22 || nvm install 22
  fi
else
  # Check current Node version
  NODE_VERSION=$(node -v)
  REQUIRED_VERSION="v22"
  
  echo "Current Node.js version: $NODE_VERSION"
  
  # If not using v22.x, show an error
  if [[ "$NODE_VERSION" != "$REQUIRED_VERSION"* ]]; then
    echo "ERROR: This project requires Node.js version 22.x"
    echo "Current version is $NODE_VERSION"
    echo ""
    echo "Please install or switch to Node.js 22 before continuing."
    echo "If you have nvm installed, you can run: nvm use 22"
    exit 1
  fi
fi

# Run the command that was passed
echo "Running: $@"
$@
