#!/usr/bin/env node

// Test the complete flow for the word PIANO
import { checkWordOnline } from './src/data/dictionary.js';

console.log('=== Testing PIANO word flow ===');

async function testPianoFlow() {
  console.log('1. Testing checkWordOnline directly with PIANO...');
  
  try {
    const result = await checkWordOnline('PIANO');
    console.log(`   Result: ${result}`);
    
    if (result) {
      console.log('✅ PIANO is valid according to online dictionary');
    } else {
      console.log('❌ PIANO is NOT valid according to online dictionary');
    }
  } catch (error) {
    console.error('❌ Error checking PIANO:', error);
  }
  
  console.log('\n2. Testing the React component logic...');
  console.log('   Based on our trace:');
  console.log('   - isInDictionary("PIANO", true) should return false');
  console.log('   - PIANO is not in the common words array');
  console.log('   - Should start online check and return true from isValidWord');
  console.log('   - Online check should succeed and call handleSubmitValidatedGuess');
  
  console.log('\n3. Likely issue areas to check:');
  console.log('   a) Is the async promise chain working correctly?');
  console.log('   b) Is handleSubmitValidatedGuess being called?');
  console.log('   c) Is there any state preventing the submission?');
}

testPianoFlow().catch(console.error);
