// Test script to debug PIANO issue directly in the browser
// Paste this into the browser console

console.log('=== PIANO DEBUG TEST ===');

// Test 1: Check if functions are available
console.log('1. Testing function availability...');
console.log('typeof window.debugTestPiano:', typeof window.debugTestPiano);
console.log('typeof window.debugValidateWord:', typeof window.debugValidateWord);

// Test 2: Direct API test
console.log('\n2. Testing API directly...');
fetch('https://api.dictionaryapi.dev/api/v2/entries/en/piano')
  .then(response => {
    console.log('API response status:', response.status);
    console.log('API response ok:', response.ok);
    return response.ok;
  })
  .then(isValid => {
    console.log('API result for PIANO:', isValid);
  })
  .catch(error => {
    console.error('API error:', error);
  });

// Test 3: Test the debug functions if available
setTimeout(() => {
  console.log('\n3. Testing debug functions...');
  
  if (typeof window.debugTestPiano === 'function') {
    console.log('Testing debugTestPiano...');
    window.debugTestPiano().then(result => {
      console.log('debugTestPiano result:', result);
    }).catch(error => {
      console.error('debugTestPiano error:', error);
    });
  }
  
  if (typeof window.debugValidateWord === 'function') {
    console.log('Testing debugValidateWord with PIANO...');
    const result = window.debugValidateWord('PIANO');
    console.log('debugValidateWord result:', result);
  }
}, 1000);

// Test 4: Instructions
console.log('\n4. Manual test instructions:');
console.log('- Type PIANO in the game');
console.log('- Press Enter');
console.log('- Watch this console for debug messages');
console.log('- Look for messages starting with [handleSubmitGuess], [isValidWord], etc.');

console.log('\n=== Ready for testing ===');
