#!/bin/bash
set -e  # Exit immediately if a command fails

echo "=== Wordle Extreme Node.js Runner ==="
echo "Setting up NVM environment..."
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "Switching to LTS Node.js version..."
nvm use --lts || nvm use 22 || nvm install 22

# Check if any arguments were provided
if [ "$#" -eq 0 ]; then
  echo "No command specified. Please provide a command to run."
  echo "Usage: ./run-with-nvm.sh <command>"
  echo "Example: ./run-with-nvm.sh npm test"
  exit 1
fi

# Run the command that was passed
echo "Running: $@"
$@
