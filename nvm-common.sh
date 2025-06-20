#!/bin/bash
# Common NVM setup function
# Source this file in other scripts with: source ./nvm-common.sh

setup_nvm() {
    echo "Setting up NVM environment..."
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    
    echo "Switching to LTS Node.js version..."
    nvm use --lts || nvm use 22 || nvm install 22
}

# Function to verify NVM setup worked
verify_node() {
    if command -v node &> /dev/null; then
        echo "Using Node.js version: $(node --version)"
        echo "Using npm version: $(npm --version)"
    else
        echo "Error: Node.js not available after NVM setup"
        exit 1
    fi
}
