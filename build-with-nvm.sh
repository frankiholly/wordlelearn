#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use --lts

# Update version files before building
echo "Updating version files..."
./scripts/update-version.sh

npm install --save gh-pages
npm run build
