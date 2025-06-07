#!/bin/bash
# Node.js Version Checker and Auto-Setup
# This script should be run before any Node.js operations

set -e

echo "=== Node.js Compatibility Checker ==="

# Check if .node-status file exists
if [ -f ".node-status" ]; then
    echo "Found Node.js status file, checking compatibility..."
    source .node-status
    echo "Project: $PROJECT_NAME"
    echo "Required Node version: $REQUIRED_NODE_VERSION"
    echo "Preferred Node version: $PREFERRED_NODE_VERSION"
else
    echo "Warning: .node-status file not found"
fi

# Setup NVM environment
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Check current Node version
if command -v node &> /dev/null; then
    CURRENT_NODE_VERSION=$(node --version)
    echo "Current Node.js version: $CURRENT_NODE_VERSION"
else
    echo "Node.js not found!"
    exit 1
fi

# Check if NVM is available
if command -v nvm &> /dev/null; then
    echo "NVM is available"
    
    # Try to use the preferred version
    echo "Switching to preferred Node.js version ($PREFERRED_NODE_VERSION)..."
    nvm use $PREFERRED_NODE_VERSION 2>/dev/null || nvm use --lts 2>/dev/null || {
        echo "Installing Node.js LTS version..."
        nvm install --lts
        nvm use --lts
    }
    
    NEW_VERSION=$(node --version)
    echo "Now using Node.js version: $NEW_VERSION"
else
    echo "Warning: NVM not available. Using system Node.js"
fi

# Verify npm is working
if npm --version &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "npm version: $NPM_VERSION"
else
    echo "Error: npm not working"
    exit 1
fi

echo "✓ Node.js environment ready"
