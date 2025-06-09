// Paste this into the browser console to test PIANO validation

// First, let's test the online dictionary function directly
console.log('=== Testing PIANO in browser console ===');

// Import the checkWordOnline function (this may not work depending on how modules are exposed)
// If this doesn't work, we'll access it through the global window object or React DevTools

// Test 1: Try to access the checkWordOnline function
try {
  // This might work if the function is exposed globally
  if (typeof checkWordOnline !== 'undefined') {
    console.log('checkWordOnline is available globally');
    checkWordOnline('PIANO').then(result => {
      console.log('PIANO check result:', result);
    }).catch(error => {
      console.error('PIANO check error:', error);
    });
  } else {
    console.log('checkWordOnline is not available globally');
  }
} catch (error) {
  console.error('Error accessing checkWordOnline:', error);
}

// Test 2: Test the API directly using fetch
console.log('Testing API directly...');
fetch('https://api.dictionaryapi.dev/api/v2/entries/en/piano')
  .then(response => {
    console.log('API Response status:', response.status);
    console.log('API Response ok:', response.ok);
    return response.json();
  })
  .then(data => {
    console.log('API Response data:', data);
  })
  .catch(error => {
    console.error('API Error:', error);
  });

// Test 3: Check if there are any console errors
console.log('=== Check the console for any React errors ===');
console.log('Look for errors when typing PIANO and pressing Enter');

// Test 4: Instructions for manual testing
console.log('=== Manual testing instructions ===');
console.log('1. Type P-I-A-N-O in the game');
console.log('2. Press Enter');
console.log('3. Watch the console for debug messages starting with [DEBUG], [isValidWord], [handleSubmitGuess], etc.');
console.log('4. Look for messages about online checking and validation');
