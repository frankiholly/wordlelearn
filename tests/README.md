# Test Directory

This directory contains all test-related code for the Wordle Clone project, organized for better maintainability and clarity.

## Directory Structure

```
tests/
├── README.md                    # This file
├── scripts/                     # JavaScript test scripts
├── html/                        # HTML test pages and assets
└── manual/                      # Manual testing instructions and scripts
```

## Scripts Directory (`/scripts`)

### Core API Tests
- **`test-dictionary.js`** - Tests the online dictionary API directly
- **`test-pure-online.js`** - Tests pure online validation without fallbacks
- **`debug-fetch.js`** - Debug script for fetch API calls
- **`simple-test.js`** - Simple test of basic dictionary functionality

### Word-Specific Tests
- **`test-piano.js`** - Specific test for the "PIANO" word validation issue
- **`test-piano-fix-v3.js`** - Version 3 of PIANO validation test
- **`test-piano-flow.js`** - Flow test for PIANO validation
- **`test-piano-flow.mjs`** - ES module version of PIANO flow test
- **`test-piano-fix-browser.js`** - Browser-specific PIANO fix test

### App Function Tests
- **`test-app-function.js`** - Tests the main app validation functions
- **`test-browser.js`** - Browser environment testing
- **`browser-test-script.js`** - Browser-based test script
- **`browser-debug-piano.js`** - Browser debugging for PIANO validation

### Debug and Console Tools
- **`console-debug-commands.js`** - Console commands for debugging
- **`piano-debug-console.js`** - Console debugging specifically for PIANO
- **`verify-piano-fix.js`** - Verification script for PIANO fix
- **`verify-deployment-v3.4.3.js`** - Deployment verification for v3.4.3

## HTML Directory (`/html`)

### Debug Pages
- **`piano-debug.html`** - HTML page for debugging PIANO validation
- **`piano-logic-test.html`** - Logic testing page for PIANO functionality
- **`test.html`** - General test HTML page

### Assets
- **`test.txt`** - Test deployment file

## Manual Directory (`/manual`)

### Manual Testing
- **`manual-test.js`** - Manual testing script
- **`manual-test-instructions.js`** - Instructions for manual testing
- **`manual-test-v3.4.3.js`** - Version-specific manual testing for v3.4.3

## Running Tests

### Node.js Scripts
Most test scripts can be run directly with Node.js:
```bash
node tests/scripts/test-dictionary.js
node tests/scripts/test-piano.js
node tests/scripts/simple-test.js
```

### Browser Tests
Open HTML files in a browser:
```bash
open tests/html/piano-debug.html
open tests/html/test.html
```

### Manual Tests
Follow instructions in the manual directory for comprehensive testing procedures.

## Test Categories

### 1. API Validation Tests
Test the online dictionary API functionality and ensure words are properly validated.

### 2. Word-Specific Tests
Focus on specific words that have caused issues (like "PIANO") to ensure they work correctly.

### 3. Browser Compatibility Tests
Ensure the validation works correctly in different browser environments.

### 4. Debug and Verification Tools
Tools to help debug issues and verify fixes are working as expected.

## Historical Context

These tests were created to debug and fix an issue where valid words like "PIANO" were not being accepted in the Wordle clone. The solution involved:

1. Removing all local/fallback dictionary logic
2. Using only online dictionary API validation
3. Fixing React useCallback dependency issues
4. Adding proper async state handling with useEffect

All tests verify that the online-only validation approach works correctly and that previously problematic words are now accepted.
