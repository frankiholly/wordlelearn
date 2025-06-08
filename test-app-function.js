// Test the actual checkWordOnline function from our React app
const path = require('path');

// Simple fetch implementation for Node.js (since checkWordOnline uses fetch)
global.fetch = require('node-fetch');

async function testAppFunction() {
  console.log('Testing checkWordOnline function from dictionary.js...');
  
  try {
    // Import the function from our app
    const { checkWordOnline } = await import('./src/data/dictionary.js');
    
    console.log('Testing PIANO...');
    const result = await checkWordOnline('PIANO');
    console.log(`checkWordOnline('PIANO') returned: ${result}`);
    
    console.log('Testing HOUSE...');
    const result2 = await checkWordOnline('HOUSE');
    console.log(`checkWordOnline('HOUSE') returned: ${result2}`);
    
    console.log('Testing XYZZY (invalid word)...');
    const result3 = await checkWordOnline('XYZZY');
    console.log(`checkWordOnline('XYZZY') returned: ${result3}`);
    
  } catch (error) {
    console.error('Error testing app function:', error);
  }
}

testAppFunction();
