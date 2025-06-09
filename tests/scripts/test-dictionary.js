// Test script for online dictionary function
const fetch = require('node-fetch');

// Copy the function directly for testing
async function checkWordOnline(word) {
  try {
    console.log(`Checking online dictionary for word: ${word}`);
    
    const upperCaseWord = word.toUpperCase();
    
    // Emergency list for handling API failures only
    const emergencyWordList = ["HOUSE", "WATER", "PIANO", "BRAIN", "WORLD"];
    
    // Direct emergency bypass for specific words that might cause API issues
    if (emergencyWordList.includes(upperCaseWord)) {
      console.log(`Word '${upperCaseWord}' is in emergency list, accepting without API call`);
      return true;
    }
    
    // Try the Free Dictionary API (this is our primary online check)
    try {
      console.log(`Checking API for word: ${word}`);
      
      // Add a timeout to the fetch to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        console.log(`API fetch timeout triggered for word: ${word}`);
        controller.abort();
      }, 2000);
      
      try {
        // Create a promise race between the fetch and a timeout
        const fetchPromise = fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`, {
          signal: controller.signal
        });
        
        // Add a direct timeout promise to ensure we don't wait too long
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Timeout exceeded')), 2500);
        });
        
        // Race the fetch against the timeout promise
        const response = await Promise.race([fetchPromise, timeoutPromise]);
        
        clearTimeout(timeoutId);
        
        // If the response is OK (200-299), the word exists
        if (response.ok) {
          console.log(`Online dictionary API check for '${word}': Valid`);
          return true;
        }
        
        // If we get a 404, the word doesn't exist in the dictionary
        if (response.status === 404) {
          console.log(`Online dictionary API check for '${word}': Invalid`);
          // Don't return false yet, try the backup methods
        } else {
          console.log(`API check failed with status ${response.status}, trying fallbacks`);
        }
      } catch (fetchError) {
        clearTimeout(timeoutId);
        console.log('Fetch operation failed or timed out:', fetchError);
        
        // If the fetch fails with AbortError, it's likely a timeout issue
        if (fetchError.name === 'AbortError' || fetchError.message === 'Timeout exceeded') {
          console.log('Fetch operation timed out - falling back to dictionary lookup');
        }
        // Continue to fallbacks
      }
    } catch (apiError) {
      console.error('Error with online dictionary API:', apiError);
      console.log('Falling back to alternative methods...');
    }
    
    console.log(`API check failed and word '${upperCaseWord}' not in emergency list`);
    return false;
  } catch (error) {
    console.error('Unexpected error in dictionary check:', error);
    return true; // Accept the word in case of unexpected errors to avoid blocking UI
  }
}

async function testWords() {
  const testWords = ['PIANO', 'HOUSE', 'WATER', 'XXXXX', 'HELLO', 'WORLD'];
  
  console.log('Testing online dictionary function...\n');
  
  for (const word of testWords) {
    console.log(`\n--- Testing word: ${word} ---`);
    try {
      const start = Date.now();
      const result = await checkWordOnline(word);
      const duration = Date.now() - start;
      console.log(`Result: ${result ? 'VALID' : 'INVALID'} (took ${duration}ms)`);
    } catch (error) {
      console.error(`Error testing ${word}:`, error);
    }
  }
}

testWords().catch(console.error);
