// A dictionary of valid 5-letter words for the Wordle game
export const dictionary = [
  "ABOUT", "ABOVE", "ACTOR", "ACUTE", "ADEPT", "ADMIT", "ADOPT", "ADORE", "ADULT", "AFTER",
  "AGAIN", "AGENT", "AGILE", "AGREE", "AHEAD", "ALARM", "ALBUM", "ALERT", "ALIKE", "ALIVE",
  "ALLOW", "ALLOY", "ALONE", "ALONG", "ALTER", "AMBER", "AMBLE", "AMEND", "AMIDST", "AMONG",
  "AMPLE", "AMUSE", "ANGEL", "ANGER", "ANGLE", "ANGRY", "ANIME", "ANKLE", "ANNEX", "ANNOY",
  "ANNUAL", "ANSWER", "ANTIC", "ANVIL", "AORTA", "APART", "APHID", "APPLE", "APPLY", "APRON",
  "ARBOR", "ARDOR", "ARGUE", "ARISE", "ARMOR", "AROMA", "AROSE", "ARRAY", "ARROW", "ARSON",
  "ARTSY", "ASCOT", "ASHEN", "ASIDE", "ASKEW", "ASSAY", "ASSET", "ATOLL", "ATONE", "AUDIO",
  "AUDIT", "AUGUR", "AUNTY", "AVAIL", "AVERT", "AVIAN", "AVOID", "AWAIT", "AWAKE", "AWARD",
  "AWARE", "AWFUL", "AWOKE", "AXIAL", "AXIOM", "AZURE",
  "BACON", "BADGE", "BADLY", "BAGEL", "BAGGY", "BAKER", "BALER", "BALMY", "BANAL", "BANJO",
  "BARGE", "BARON", "BASAL", "BASIC", "BASIL", "BASIN", "BASIS", "BASTE", "BATCH", "BATHE",
  "BATON", "BATTY", "BEACH", "BEADY", "BEARD", "BEAST", "BEECH", "BEEFY", "BEFIT", "BEGAN", 
  "BEGIN", "BEGOT", "BEGUN", "BEIGE", "BEING", "BELCH", "BELLE", "BELLY", "BELOW", "BENCH",
  "BERET", "BERRY", "BERTH", "BESET", "BETEL", "BEVEL", "BEZEL", "BIBLE", "BICEP", "BIDDY",
  "BIGOT", "BIJOU", "BIKER", "BINGE", "BINGO", "BIOME", "BIRCH", "BIRTH", "BISON", "BITTY",
  "BLACK", "BLADE", "BLAME", "BLAND", "BLANK", "BLARE", "BLAST", "BLAZE", "BLEAK", "BLEAT",
  "BLEED", "BLEND", "BLESS", "BLIMP", "BLIND", "BLINK", "BLISS", "BLITZ", "BLOAT", "BLOCK",
  "BLOKE", "BLOND", "BLOOD", "BLOOM", "BLOWN", "BLUER", "BLUFF", "BLUNT", "BLURB", "BLURT",
  "BLUSH", "BOARD", "BOAST", "BOBBY", "BONEY", "BONGO", "BONUS", "BOOBY", "BOOST", "BOOTH",
  "GIANT", "GLARE", "GLEAM", "GLOBE", "GLORY", "GLOVE", "GNARL", "GOOSE", "GRACE", "GRADE",
  "BOOTY", "BOOZE", "BORAX", "BORED", "BORNE", "BOSOM", "BOSSY", "BOTCH", "BOUGH", "BOULE",
  "BOUND", "BOWEL", "BOXER", "BRACE", "BRAID", "BRAIN", "BRAKE", "BRAND", "BRASH", "BRASS",
  "BRAVE", "BRAVO", "BRAWL", "BRAWN", "BREAD", "BREAK", "BREAM", "BREED", "BRIBE", "BRICK",
  "BRIDE", "BRIEF", "BRIM", "BRINE", "BRING", "BRINK", "BRINY", "BRISK", "BROAD", "BROIL",
  "BROKE", "BROOD", "BROOK", "BROOM", "BROTH", "BROWN", "BRUNT", "BRUSH", "BRUTE", "BUDDY",
  "BUDGE", "BUGGY", "BUILD", "BUILT", "BULGE", "BULKY", "BULLY", "BUMPY", "BUNCH", "BUNNY",
  "BURLY", "BURNT", "BURST", "BUSED", "BUSHY", "BUTCH", "BUTTE", "BUXOM", "BUYER", "BYLAW",
  // Add many more words...
  "YACHT", "YEARN", "YEAST", "YIELD", "YOUNG", "YOUTH", "ZEBRA", "ZESTY", "ZONAL"
];

/**
 * Check if a word is in the dictionary
 * @param {string} word - The word to check
 * @returns {boolean} - True if the word is in the dictionary, false otherwise
 */
// Local dictionary check
function isInLocalDictionary(word) {
  const upperCaseWord = word.toUpperCase();
  return dictionary.includes(upperCaseWord);
}

// Function to check if a word exists using the Free Dictionary API
// This returns a Promise that resolves to true if the word exists, false otherwise
export async function checkWordOnline(word) {
  try {
    console.log(`Checking online dictionary for word: ${word}`);
    
    // First option: Free Dictionary API
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
    
    // If the response is OK (200-299), the word exists
    if (response.ok) {
      console.log(`Online dictionary check for '${word}': Found=true`);
      return true;
    }
    
    // If we get a 404, the word doesn't exist in the dictionary
    if (response.status === 404) {
      console.log(`Online dictionary check for '${word}': Found=false`);
      return false;
    }
    
    // For other errors, try WordsAPI as a backup
    console.log(`First API check failed with status ${response.status}, trying backup API...`);
    
    // Second option: WordAPI - requires CORS proxy in real-world implementation
    // This is a simulation as we don't have a real API key
    // In a real implementation, you would use something like:
    // const backupResponse = await fetch('https://wordsapiv1.p.rapidapi.com/words/' + word.toLowerCase(), {
    //   headers: { 'X-RapidAPI-Key': 'YOUR_API_KEY' }
    // });
    
    // For now, we'll consider common dictionary words valid
    const commonWords = ['GIANT', 'GLARE', 'GLEAM', 'GLOBE', 'GLORY', 'GLOVE', 'GNARL', 'GOOSE', 'GRACE', 'GRADE'];
    const isCommonWord = commonWords.includes(word.toUpperCase());
    
    if (isCommonWord) {
      console.log(`Backup check for '${word}': Found in common words list`);
      return true;
    }
    
    console.log(`All online dictionary checks failed for '${word}'`);
    // Fall back to local dictionary in case all online checks fail
    return isInLocalDictionary(word);
  } catch (error) {
    console.error('Error checking word online:', error);
    // Fall back to local dictionary in case of error
    return isInLocalDictionary(word);
  }
}

// Main dictionary function that first checks local dictionary,
// then optionally checks online dictionary
export function isInDictionary(word, checkOnline = false) {
  // Ensure word is uppercase for local dictionary comparison
  const upperCaseWord = word.toUpperCase();
  
  console.log(`[isInDictionary] Checking if '${upperCaseWord}' is in dictionary`);
  console.log(`[isInDictionary] Dictionary contains ${dictionary.length} words`);

  // Let's check for some specific test words to debug
  if (upperCaseWord === 'HOUSE' || upperCaseWord === 'GIANT') {
    console.log(`[isInDictionary] Test word: HOUSE in dictionary: ${dictionary.includes('HOUSE')}`);
    console.log(`[isInDictionary] Test word: GIANT in dictionary: ${dictionary.includes('GIANT')}`);
  }
  
  // First check our local dictionary (fast)
  const isInLocal = isInLocalDictionary(upperCaseWord);
  
  console.log(`[isInDictionary] Local dictionary check for '${upperCaseWord}': Found=${isInLocal}`);
  
  // If the word is in our local dictionary, we're good
  if (isInLocal) {
    return true;
  }
  
  // If not in local dictionary and online checking is enabled,
  // we'll return false to the synchronous call, but the online check 
  // will be initiated in the App.js component
  if (checkOnline) {
    console.log(`[isInDictionary] Word '${upperCaseWord}' not found locally, will check online dictionary`);
    // Note: The actual check will happen asynchronously in App.js
    return false;
  }
  
  console.log(`[isInDictionary] Word '${upperCaseWord}' is not in the local dictionary of ${dictionary.length} words`);
  return false;
}
