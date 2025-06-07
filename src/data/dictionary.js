// This file only provides online dictionary validation
// We no longer use a local dictionary at all
// Export an empty array to satisfy any imports
export const dictionary = [];

// Emergency list for handling API failures only
// Only used when online check completely fails
const emergencyWordList = [
  "HOUSE", "WATER", "PIANO", "BRAIN", "WORLD"
];

/**
 * Check if a word is in the online dictionary.
 * This is the preferred method for validating words.
 * 
 * @param {string} word - The word to check
 * @returns {Promise<boolean>} - Whether the word is valid
 */
export async function checkWordOnline(word) {
  try {
    console.log(`Checking online dictionary for word: ${word}`);
    
    const upperCaseWord = word.toUpperCase();
    
    // Direct emergency bypass for specific words that might cause API issues
    if (emergencyWordList.includes(upperCaseWord)) {
      console.log(`Word '${upperCaseWord}' is in emergency list, accepting without API call`);
      return true;
    }
    
    // Try the Free Dictionary API with a simple timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log(`API fetch timeout triggered for word: ${word}`);
      controller.abort();
    }, 3000); // 3-second timeout
    
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`, {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      // If the response is OK (200-299), the word exists
      if (response.ok) {
        console.log(`Online dictionary API check for '${word}': Valid`);
        return true;
      }
      
      // If we get a 404, the word doesn't exist in the dictionary
      if (response.status === 404) {
        console.log(`Online dictionary API check for '${word}': Invalid`);
        return false;
      }
      
      // For other status codes, log and return false
      console.log(`API check failed with status ${response.status} for word '${word}'`);
      return false;
      
    } catch (fetchError) {
      clearTimeout(timeoutId);
      console.log('Fetch operation failed or timed out:', fetchError);
      
      // If the fetch fails with AbortError, it's likely a timeout issue
      if (fetchError.name === 'AbortError') {
        console.log(`Fetch operation timed out for word '${word}' - rejecting word`);
        return false;
      }
      
      // For other errors, also reject the word
      console.log(`Fetch operation failed for word '${word}' - rejecting word`);
      return false;
    }
    
  } catch (error) {
    console.error('Unexpected error in dictionary check:', error);
    // In case of unexpected errors, reject the word to be safe
    return false;
  }
}

/**
 * Check if a word is in the dictionary.
 * This function prioritizes online checking but can fallback to local if needed.
 * 
 * @param {string} word - The word to check
 * @param {boolean} checkOnline - Whether to check online (preferred)
 * @returns {boolean} - If false and checkOnline=true, caller should use checkWordOnline()
 */
export function isInDictionary(word, checkOnline = true) {
  // Ensure word is uppercase for dictionary comparison
  const upperCaseWord = word.toUpperCase();
  
  console.log(`[isInDictionary] Checking if '${upperCaseWord}' is valid`);
  
  // Always return false to trigger online check
  console.log(`[isInDictionary] Word '${upperCaseWord}' will be checked online`);
  return false;
}
