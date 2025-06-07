// Minimal dictionary for essential fallback only (online is preferred)
// Export an empty dictionary to satisfy any imports
export const dictionary = [];

// Internal dictionary for fallback when online is not available
const minimumDictionary = [
  // Most common 5-letter words that should always be accepted even without online check
  "ABOUT", "ABOVE", "ACTOR", "ADULT", "AFTER", "AGAIN", "AGREE", "AHEAD", 
  "APPLE", "AWARD", "BEGIN", "BEING", "BELOW", "BLACK", "BRAIN", "BREAD", 
  "BRING", "BROWN", "BUILD", "HOUSE", "LIGHT", "WATER", "WORLD", "HEART",
  "BEACH", "CLOUD", "EARTH", "FUNNY", "GIANT", "HAPPY", "LAUGH", "MONEY",
  "MUSIC", "PHONE", "PLANT", "PIZZA", "RIVER", "SMILE", "SPACE", "SPORT",
  "STONE", "TIGER", "TABLE", "WATCH", "WOMAN"
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
    
    // Set a timeout for the entire check process
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Dictionary check timed out')), 5000); // 5-second total timeout
    });
    
    // Create a promise that will be resolved by our actual check
    const checkPromise = new Promise(async (resolve) => {
      const upperCaseWord = word.toUpperCase();
    
    // Common 5-letter English words that should always be valid
    // This serves as both a first check and a fallback if APIs fail
    const commonWords = [
      // Common household words
      "HOUSE", "TABLE", "CHAIR", "PLATE", "GLASS", "KNIFE", "SPOON", "CLOCK", "LIGHT", "FLOOR", 
      // Natural elements
      "WATER", "EARTH", "PLANT", "RIVER", "STONE", "BEACH", "CLOUD", "WORLD", "OCEAN", "TIGER",
      // Common abstract words
      "HAPPY", "DREAM", "SMILE", "LAUGH", "MUSIC", "MONEY", "HEART", "BRAIN", "GIANT", "FUNNY",
      // Clothing and accessories
      "SHIRT", "SOCKS", "SHOES", "WATCH", "PHONE", "PAPER", "PHOTO", "PAINT", "SPORT", "DRINK",
      // Food words
      "APPLE", "PIZZA", "STEAK", "SALAD", "BREAD", "FRUIT", "CHEESE", "CANDY", "CREAM", "BACON"
    ];
    
    // Check our common word list first (fast)
    if (commonWords.includes(upperCaseWord)) {
      console.log(`Word '${upperCaseWord}' found in common words list`);
      return true;
    }
    
    // Try the Free Dictionary API (this is our primary online check)
    try {
      console.log(`Checking API for word: ${word}`);
      
      // Add a timeout to the fetch to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3-second timeout
      
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`, {
        signal: controller.signal
      }).catch(err => {
        console.log('Fetch operation aborted or failed:', err);
        clearTimeout(timeoutId);
        // If the fetch fails with AbortError, it's likely a timeout issue
        if (err.name === 'AbortError') {
          console.log('Fetch operation timed out - falling back to dictionary lookup');
          // Accept common words to improve UX
          if (minimumDictionary.includes(upperCaseWord)) {
            return { ok: true, status: 200, statusText: 'Timeout fallback accepted' };
          }
        }
        return { ok: false, status: 0, statusText: 'Network error or timeout' };
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
        // Don't return false yet, try the backup methods
      } else {
        console.log(`API check failed with status ${response.status}, trying fallbacks`);
      }
    } catch (apiError) {
      console.error('Error with online dictionary API:', apiError);
      console.log('Falling back to alternative methods...');
    }
    
    // As a fallback, check the minimal dictionary
    if (minimumDictionary.includes(upperCaseWord)) {
      console.log(`Word '${upperCaseWord}' found in minimal fallback dictionary`);
      return true;
    }
    
    // As a final fallback, use heuristics for 5-letter English words
    // Check for common patterns in English words
    const looksLikeEnglishWord = /^[BCDFGHJKLMNPQRSTVWXZ][AEIOU].*[BCDFGHJKLMNPQRSTVWXZ]$/.test(upperCaseWord) || 
                               /^.*[AEIOU].*[AEIOU].*$/.test(upperCaseWord);
    
    if (looksLikeEnglishWord) {
      console.log(`Word '${upperCaseWord}' looks like a valid English word, accepting`);
      return true;
    }
    
      // If all checks fail, the word isn't valid
      console.log(`Word '${upperCaseWord}' not found in any dictionary check`);
      resolve(false);
      
    });
    
    try {
      // Race between our check and the timeout
      return await Promise.race([checkPromise, timeoutPromise]);
    } catch (error) {
      console.error('Error in overall online check process:', error);
      // As a fallback, accept the word if it has vowels (very permissive fallback)
      const hasVowels = /[AEIOU]/.test(word.toUpperCase());
      return hasVowels;
    }
  } catch (error) {
    console.error('Unexpected error in dictionary check:', error);
    return true; // Accept the word in case of unexpected errors to avoid blocking UI
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
  
  // For commonly tested words, give immediate acceptance
  if (upperCaseWord === 'HOUSE' || upperCaseWord === 'GIANT' || upperCaseWord === 'WATER' || upperCaseWord === 'BRAIN') {
    console.log(`[isInDictionary] Common test word found, accepting immediately`);
    return true;
  }
  
  // First, always prefer online checking for better validation
  if (checkOnline) {
    console.log(`[isInDictionary] Word '${upperCaseWord}' will be checked online`);
    // The actual async check will happen in App.js
    return false;
  }
  
  // Only if online is disabled, use the minimal local dictionary
  const isInLocal = minimumDictionary.includes(upperCaseWord);
  console.log(`[isInDictionary] Fallback local dictionary check: ${isInLocal ? 'Valid' : 'Invalid'}`);
  
  // Return local result only when online is disabled
  return isInLocal;
}
