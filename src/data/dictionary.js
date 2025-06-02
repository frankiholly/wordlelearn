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
export function isInDictionary(word) {
  // Ensure word is uppercase for dictionary comparison
  const upperCaseWord = word.toUpperCase();
  
  // Check if the word is in our dictionary
  const isInDict = dictionary.includes(upperCaseWord);
  
  // Debug information
  console.log(`Dictionary check for '${upperCaseWord}': Found=${isInDict}`);
  if (!isInDict) {
    console.log(`Word '${upperCaseWord}' is not in the dictionary of ${dictionary.length} words`);
  }
  
  return isInDict;
}
