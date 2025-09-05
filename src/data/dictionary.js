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
      const data = await response.json();
      
      // For Wordnik API, check if we got valid definition objects
      if (api.name === 'Wordnik') {
        if (Array.isArray(data) && data.length > 0) {
          // Check if we have valid definition objects with proper structure
          const hasValidDefinition = data.some(def => 
            def && 
            typeof def === 'object' && 
            def.word && 
            def.partOfSpeech &&
            (def.text || def.id) // Accept if has text OR has valid id (Wordnik structure)
          );
          if (hasValidDefinition) {
            console.log(`${api.name} API check for '${word}': Valid (${data.length} definitions)`);
            return true;
          } else {
            console.log(`${api.name} API check for '${word}': Invalid (no valid definitions)`);
            return null; // Try next API instead of rejecting
          }
        } else {
          console.log(`${api.name} API check for '${word}': Invalid (no definitions array)`);
          return null; // Try next API instead of rejecting
        }
      } else {
        // For DictionaryAPI, any 200 response with proper structure means valid
        if (Array.isArray(data) && data.length > 0 && data[0].word) {
          console.log(`${api.name} API check for '${word}': Valid (${response.status})`);
          return true;
        } else {
          console.log(`${api.name} API check for '${word}': Invalid response structure`);
          return null; // Try next API
        }
      }
    }
    
    if (response.status === 404) {
      console.log(`${api.name} API check for '${word}': Not found (404)`);
      return null; // Try next API instead of definitively rejecting
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
        console.log(`Word '${word}' definitively rejected by ${api.name}`);
        return false;
      }
      
      // result === null means API error or inconclusive, try next one
      console.log(`${api.name} API inconclusive for '${word}', trying next endpoint...`);
    }
    
    // If all APIs failed/errored or were inconclusive, reject the word
    console.log(`All API endpoints failed or were inconclusive for word '${word}' - rejecting`);
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
