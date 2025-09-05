// This file only provides online dictionary validation
// No local dictionary or emergency lists - purely online only
// Export an empty array to satisfy any imports
export const dictionary = [];

/**
 * Check a single API endpoint for word validation
 * @param {string} word - The word to check
 * @param {object} api - API configuration object
 * @returns {Promise<boolean|null>} - true/false for valid/invalid, null for error
 */
async function checkSingleAPI(word, api) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    console.log(`${api.name} API timeout for word: ${word}`);
    controller.abort();
  }, 2000); // Fast 2-second timeout per API
  
  try {
    const response = await fetch(api.url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Wordle-Game/1.0'
      }
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      // For Wordnik API, check if we got actual definitions with text
      if (api.name === 'Wordnik') {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          // Check if any definition has actual text content
          const hasValidDefinition = data.some(def => def && def.text && def.text.trim().length > 0);
          if (hasValidDefinition) {
            console.log(`${api.name} API check for '${word}': Valid (${data.length} definitions)`);
            return true;
          } else {
            console.log(`${api.name} API check for '${word}': Invalid (no text definitions)`);
            return false;
          }
        } else {
          console.log(`${api.name} API check for '${word}': Invalid (no definitions)`);
          return false;
        }
      } else {
        // For DictionaryAPI, any 200 response means valid
        console.log(`${api.name} API check for '${word}': Valid (${response.status})`);
        return true;
      }
    }
    
    if (response.status === 404) {
      console.log(`${api.name} API check for '${word}': Invalid (404)`);
      return false;
    }
    
    console.log(`${api.name} API returned status ${response.status} for word '${word}'`);
    return null; // Error state - try next API
    
  } catch (fetchError) {
    clearTimeout(timeoutId);
    console.log(`${api.name} API failed for '${word}':`, fetchError.message);
    return null; // Error state - try next API
  }
}

/**
 * Check if a word is in the online dictionary.
 * Uses multiple APIs for redundancy with quick failover.
 * 
 * @param {string} word - The word to check
 * @returns {Promise<boolean>} - Whether the word is valid
 */
export async function checkWordOnline(word) {
  try {
    console.log(`Checking online dictionary for word: ${word}`);
    
    const lowerWord = word.toLowerCase();
    
    // API endpoints for redundancy (Wordnik first since DictionaryAPI seems unreliable)
    const apis = [
      {
        url: `https://api.wordnik.com/v4/word.json/${lowerWord}/definitions?limit=1&includeRelated=false&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`,
        name: 'Wordnik'
      },
      {
        url: `https://api.dictionaryapi.dev/api/v2/entries/en/${lowerWord}`,
        name: 'DictionaryAPI'
      }
    ];
    
    // Try each API in sequence until we get a definitive answer
    for (const api of apis) {
      const result = await checkSingleAPI(word, api);
      
      if (result === true) {
        console.log(`Word '${word}' validated by ${api.name}`);
        return true;
      }
      
      if (result === false) {
        console.log(`Word '${word}' rejected by ${api.name}`);
        return false;
      }
      
      // result === null means API error, try next one
      console.log(`${api.name} API error, trying next endpoint...`);
    }
    
    // If all APIs failed/errored, reject the word
    console.log(`All API endpoints failed for word '${word}' - rejecting`);
    return false;
    
  } catch (error) {
    console.error('Unexpected error in dictionary check:', error);
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
