// Test script to verify the new LCG-based daily word selection

// Copy the function directly for testing
function getDailyWord() {
  // Get today's date in UTC to ensure consistency across timezones
  const today = new Date();
  const utcDate = new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  
  // Use epoch days as seed for consistent daily words
  const epochStart = new Date('2024-01-01'); // Game start date
  const daysSinceEpoch = Math.floor((utcDate - epochStart) / (1000 * 60 * 60 * 24));
  
  // Enhanced curated word list (1000+ words) - alphabetically ordered for easy maintenance
  const dailyWords = [
    'ABOUT', 'ABOVE', 'ABUSE', 'ACTOR', 'ACUTE', 'ADAPT', 'ADMIT', 'ADOPT', 'ADULT', 'AFTER',
    'AGAIN', 'AGENT', 'AGREE', 'AHEAD', 'ALARM', 'ALBUM', 'ALERT', 'ALIEN', 'ALIGN', 'ALIKE',
    'ALIVE', 'ALLOW', 'ALONE', 'ALONG', 'ALTER', 'ANGEL', 'ANGER', 'ANGLE', 'ANGRY', 'APART',
    'APPLE', 'APPLY', 'ARENA', 'ARGUE', 'ARISE', 'ARRAY', 'ARROW', 'ASIDE', 'ASSET', 'ATLAS',
    'AUDIO', 'AUDIT', 'AVOID', 'AWAKE', 'AWARD', 'AWARE', 'BADLY', 'BAKER', 'BASIC', 'BATCH',
    'BEACH', 'BEARD', 'BEAST', 'BEGAN', 'BEGIN', 'BENCH', 'BERRY', 'BIRTH', 'BLACK', 'BLADE',
    'BLAME', 'BLANK', 'BLAST', 'BLAZE', 'BLIND', 'BLOCK', 'BLOOD', 'BLOOM', 'BOARD', 'BOOST',
    'BOOTH', 'BOUND', 'BOXES', 'BRAIN', 'BRAND', 'BRASS', 'BRAVE', 'BREAD', 'BREAK', 'BREED',
    'BRICK', 'BRIDE', 'BRIEF', 'BRING', 'BROAD', 'BROKE', 'BROWN', 'BRUSH', 'BUILD', 'BUILT',
    'BUNCH', 'BURST', 'BUYER', 'CABLE', 'CACHE', 'CAMEL', 'CANDY', 'CARDS', 'CARRY', 'CATCH',
    'CAUSE', 'CHAIN', 'CHAIR', 'CHAOS', 'CHARM', 'CHART', 'CHASE', 'CHEAP', 'CHECK', 'CHESS',
    'CHEST', 'CHIEF', 'CHILD', 'CHINA', 'CHIPS', 'CHOSE', 'CIVIC', 'CIVIL', 'CLAIM', 'CLASS',
    'CLEAN', 'CLEAR', 'CLICK', 'CLIMB', 'CLOCK', 'CLOSE', 'CLOTH', 'CLOUD', 'COACH', 'COAST',
    'COINS', 'COLOR', 'COMET', 'CORAL', 'COULD', 'COUNT', 'COURT', 'COVER', 'CRAFT', 'CRANE',
    'CRASH', 'CRAZY', 'CREAM', 'CREEK', 'CRIME', 'CRISP', 'CROSS', 'CROWD', 'CROWN', 'CRUDE',
    'CRUSH', 'CURVE', 'CYCLE', 'DAILY', 'DANCE', 'DATED', 'DEALT', 'DEATH', 'DEBUT', 'DELAY',
    'DEPTH', 'DESKS', 'DEVIL', 'DIARY', 'DIGIT', 'DIRTY', 'DISCO', 'DIVER', 'DOING', 'DOORS',
    'DOUBT', 'DOZEN', 'DRAFT', 'DRAMA', 'DRANK', 'DREAM', 'DRESS', 'DRIED', 'DRILL', 'DRINK',
    'DRIVE', 'DROVE', 'DRUMS', 'DRUNK', 'DYING', 'EAGER', 'EAGLE', 'EARLY', 'EARTH', 'EIGHT',
    'ELDER', 'ELITE', 'EMPTY', 'ENEMY', 'ENJOY', 'ENTER', 'ENTRY', 'EQUAL', 'ERROR', 'EVENT',
    'EVERY', 'EXACT', 'EXIST', 'EXTRA', 'FABLE', 'FACED', 'FACTS', 'FAITH', 'FALSE', 'FANCY',
    'FATAL', 'FAULT', 'FEAST', 'FIBER', 'FIELD', 'FIFTH', 'FIFTY', 'FIGHT', 'FILES', 'FINAL',
    'FINDS', 'FIRES', 'FIRST', 'FIXED', 'FLAGS', 'FLAME', 'FLASH', 'FLEET', 'FLESH', 'FLIES',
    'FLOOR', 'FLOUR', 'FLOWS', 'FLUID', 'FOCUS', 'FORCE', 'FORMS', 'FORTH', 'FORTY', 'FORUM',
    'FOUND', 'FRAME', 'FRANK', 'FRAUD', 'FRESH', 'FRIED', 'FRONT', 'FROST', 'FRUIT', 'FULLY',
    'FUNNY', 'GAMES', 'GATES', 'GENUS', 'GHOST', 'GIANT', 'GIFTS', 'GIRLS', 'GIVEN', 'GLASS',
    'GLOBE', 'GLORY', 'GLOVE', 'GOALS', 'GOATS', 'GOING', 'GOODS', 'GRACE', 'GRADE', 'GRAIN',
    'GRAND', 'GRANT', 'GRAPE', 'GRAPH', 'GRASP', 'GRASS', 'GRAVE', 'GREAT', 'GREEN', 'GREET',
    'GRIEF', 'GRILL', 'GRIND', 'GROSS', 'GROUP', 'GROWN', 'GUARD', 'GUESS', 'GUEST', 'GUIDE',
    'GUILT', 'HABIT', 'HANDS', 'HAPPY', 'HARSH', 'HASTE', 'HEART', 'HEAVY', 'HEDGE', 'HENCE',
    'HERBS', 'HILLS', 'HINTS', 'HORSE', 'HOTEL', 'HOUSE', 'HUMAN', 'HUMOR', 'HURRY', 'IDEAL',
    'IDEAS', 'IMAGE', 'INDEX', 'INNER', 'INPUT', 'ISSUE', 'ITEMS', 'JEANS', 'JOKES', 'JOINT',
    'JUDGE', 'JUICE', 'JUMPS', 'KEEPS', 'KILLS', 'KINDS', 'KINGS', 'KNIFE', 'KNOCK', 'KNOWN',
    'LABEL', 'LACKS', 'LAKES', 'LANDS', 'LARGE', 'LASER', 'LATER', 'LAUGH', 'LAYER', 'LEADS',
    'LEARN', 'LEASE', 'LEAST', 'LEAVE', 'LEDGE', 'LEGAL', 'LEMON', 'LEVEL', 'LIGHT', 'LIKED',
    'LIMIT', 'LINES', 'LINKS', 'LISTS', 'LIVED', 'LIVES', 'LOADS', 'LOANS', 'LOCAL', 'LOCKS',
    'LODGE', 'LOGIC', 'LOOSE', 'LORDS', 'LOVED', 'LOVES', 'LOWER', 'LUCKY', 'LUNCH', 'LYING',
    'MAGIC', 'MAJOR', 'MAKER', 'MALES', 'MAPLE', 'MARCH', 'MARKS', 'MARRY', 'MATCH', 'MAYBE',
    'MAYOR', 'MEALS', 'MEANS', 'MEANT', 'MEATS', 'MEDAL', 'MEDIA', 'MEETS', 'MELON', 'MERCY',
    'METAL', 'METER', 'MIGHT', 'MILLS', 'MINDS', 'MINES', 'MINOR', 'MINUS', 'MIXED', 'MODEL',
    'MODES', 'MONEY', 'MONTH', 'MORAL', 'MOTOR', 'MOUNT', 'MOUSE', 'MOUTH', 'MOVED', 'MOVES',
    'MOVIE', 'MUSIC', 'NEEDS', 'NERVE', 'NEVER', 'NEWLY', 'NIGHT', 'NOBLE', 'NODES', 'NOISE',
    'NORTH', 'NOTED', 'NOTES', 'NOVEL', 'NURSE', 'OATHS', 'OCCUR', 'OCEAN', 'OFFER', 'OFTEN',
    'OLDER', 'OLIVE', 'OPENS', 'OPERA', 'ORDER', 'ORGAN', 'OTHER', 'OUGHT', 'OUTER', 'OWNED',
    'OWNER', 'PAGES', 'PAINT', 'PAIRS', 'PANEL', 'PANIC', 'PAPER', 'PARKS', 'PARTS', 'PARTY',
    'PASTA', 'PATCH', 'PATHS', 'PAUSE', 'PEACE', 'PEACH', 'PEAKS', 'PEARL', 'PENNY', 'PHASE',
    'PHONE', 'PHOTO', 'PIANO', 'PICKS', 'PIECE', 'PILLS', 'PILOT', 'PIPES', 'PITCH', 'PIZZA',
    'PLACE', 'PLAIN', 'PLANE', 'PLANS', 'PLANT', 'PLATE', 'PLAYS', 'PLAZA', 'PLOTS', 'POEMS',
    'POINT', 'POKER', 'POOLS', 'PORTS', 'POSED', 'POUND', 'POWER', 'PRESS', 'PRICE', 'PRIDE',
    'PRIME', 'PRINT', 'PRIOR', 'PRIZE', 'PROOF', 'PROPS', 'PROUD', 'PROVE', 'PULLS', 'PUMPS',
    'PUNCH', 'PUPILS', 'PURSE', 'QUEST', 'QUEEN', 'QUICK', 'QUIET', 'QUITE', 'QUOTE', 'RACES',
    'RADIO', 'RAILS', 'RAINS', 'RAISE', 'RANGE', 'RANKS', 'RAPID', 'RATES', 'RATIO', 'REACH',
    'READS', 'READY', 'REALM', 'REBEL', 'REFER', 'RELAX', 'REPLY', 'RESET', 'RIDES', 'RIGHT',
    'RIGID', 'RINGS', 'RISES', 'RISKS', 'RIVAL', 'RIVER', 'ROADS', 'ROAST', 'ROBOT', 'ROCKS',
    'ROLES', 'ROLLS', 'ROOTS', 'ROSES', 'ROUGH', 'ROUND', 'ROUTE', 'ROYAL', 'RULES', 'RURAL',
    'SADLY', 'SAFER', 'SAINT', 'SALES', 'SALAD', 'SAUCE', 'SAVED', 'SCALE', 'SCARE', 'SCENE',
    'SCOPE', 'SCORE', 'SCREW', 'SEALS', 'SEATS', 'SEEDS', 'SEEMS', 'SELLS', 'SENSE', 'SERVE',
    'SEVEN', 'SHADE', 'SHAKE', 'SHALL', 'SHAME', 'SHAPE', 'SHARE', 'SHARK', 'SHARP', 'SHEET',
    'SHELF', 'SHELL', 'SHIFT', 'SHINE', 'SHIRT', 'SHOCK', 'SHOES', 'SHOOT', 'SHOPS', 'SHORT',
    'SHOTS', 'SHOWN', 'SIDES', 'SIGHT', 'SIGNS', 'SILLY', 'SINCE', 'SITES', 'SIXTH', 'SIXTY',
    'SIZED', 'SKILL', 'SKINS', 'SLEEP', 'SLIDE', 'SLOPE', 'SMALL', 'SMART', 'SMILE', 'SMOKE',
    'SNAKE', 'SNAPS', 'SNOWY', 'SOCKS', 'SOLAR', 'SOLID', 'SOLVE', 'SONGS', 'SORRY', 'SORTS',
    'SOULS', 'SOUND', 'SOUTH', 'SPACE', 'SPARE', 'SPEAK', 'SPEED', 'SPELL', 'SPEND', 'SPENT',
    'SPINE', 'SPLIT', 'SPOKE', 'SPORT', 'SPOTS', 'SPRAY', 'STACK', 'STAFF', 'STAGE', 'STAKE',
    'STAMP', 'STAND', 'STARS', 'START', 'STATE', 'STAYS', 'STEAM', 'STEEL', 'STEEP', 'STEER',
    'STEMS', 'STEPS', 'STICK', 'STILL', 'STOCK', 'STONE', 'STOOD', 'STOPS', 'STORE', 'STORM',
    'STORY', 'STRIP', 'STUCK', 'STUDY', 'STUFF', 'STYLE', 'SUGAR', 'SUITE', 'SUPER', 'SWEAT',
    'SWEET', 'SWING', 'SWORD', 'TABLE', 'TAKEN', 'TALES', 'TALKS', 'TANKS', 'TAPES', 'TASKS',
    'TASTE', 'TAXES', 'TEACH', 'TEAMS', 'TEARS', 'TEENS', 'TEETH', 'TELLS', 'TERMS', 'TESTS',
    'THANK', 'THEFT', 'THEIR', 'THEME', 'THERE', 'THESE', 'THICK', 'THING', 'THINK', 'THIRD',
    'THOSE', 'THREE', 'THREW', 'THROW', 'THUMB', 'TIGER', 'TIGHT', 'TILES', 'TIMES', 'TIRED',
    'TITLE', 'TODAY', 'TOKEN', 'TONES', 'TOOLS', 'TOOTH', 'TOPIC', 'TOTAL', 'TOUCH', 'TOUGH',
    'TOURS', 'TOWER', 'TOWNS', 'TRACK', 'TRADE', 'TRAIL', 'TRAIN', 'TRAIT', 'TREAT', 'TREES',
    'TREND', 'TRIAL', 'TRIBE', 'TRICK', 'TRIED', 'TRIES', 'TRIPS', 'TRUCK', 'TRULY', 'TRUNK',
    'TRUST', 'TRUTH', 'TUBES', 'TURNS', 'TWICE', 'TWIST', 'TYPES', 'UNCLE', 'UNDER', 'UNDUE',
    'UNION', 'UNITS', 'UNITY', 'UNTIL', 'UPPER', 'UPSET', 'URBAN', 'URGED', 'USAGE', 'USERS',
    'USING', 'USUAL', 'VALID', 'VALUE', 'VIEWS', 'VILLA', 'VIRUS', 'VISIT', 'VITAL', 'VOCAL',
    'VOICE', 'VOTES', 'WAGES', 'WAIST', 'WALKS', 'WALLS', 'WANTS', 'WASTE', 'WATCH', 'WATER',
    'WAVES', 'WEALTH', 'WEIRD', 'WELLS', 'WHEEL', 'WHERE', 'WHICH', 'WHILE', 'WHITE', 'WHOLE',
    'WHOSE', 'WIDER', 'WINDS', 'WINES', 'WINGS', 'WIPES', 'WIRES', 'WITCH', 'WOMAN', 'WOMEN',
    'WOODS', 'WORDS', 'WORKS', 'WORLD', 'WORRY', 'WORSE', 'WORST', 'WORTH', 'WOULD', 'WRITE',
    'WRONG', 'WROTE', 'YARDS', 'YEARS', 'YIELD', 'YOUNG', 'YOURS', 'YOUTH', 'ZONES'
  ];
  
  // Apply Linear Congruential Generator (LCG) for pseudo-random but deterministic selection
  // Using well-tested LCG constants for good distribution
  const a = 1664525;        // LCG multiplier
  const c = 1013904223;     // LCG increment  
  const m = 4294967296;     // LCG modulus (2^32)
  
  const seed = (a * daysSinceEpoch + c) % m;
  const wordIndex = seed % dailyWords.length;
  
  return dailyWords[wordIndex];
}

console.log('Testing new LCG-based daily word selection...\n');

// Test the next 30 days to see word sequence
const today = new Date();
const words = [];

for (let i = 0; i < 30; i++) {
  // Create a future date
  const testDate = new Date(today);
  testDate.setDate(today.getDate() + i);
  
  // Temporarily override Date to test future dates
  const originalDate = global.Date;
  global.Date = function(...args) {
    if (args.length === 0) {
      return testDate;
    }
    return new originalDate(...args);
  };
  Object.setPrototypeOf(global.Date, originalDate);
  Object.defineProperty(global.Date, 'prototype', { 
    value: originalDate.prototype 
  });
  
  const word = getDailyWord();
  words.push(word);
  
  // Restore original Date
  global.Date = originalDate;
  
  const dateStr = testDate.toISOString().split('T')[0];
  console.log(`Day ${i + 1} (${dateStr}): ${word}`);
}

console.log('\n--- Analysis ---');
console.log(`Total words: ${words.length}`);
console.log(`Unique words: ${new Set(words).size}`);
console.log(`First 10 words: ${words.slice(0, 10).join(', ')}`);

// Check if words are in alphabetical order (which would be bad)
const sortedWords = [...words].sort();
const isAlphabetical = JSON.stringify(words) === JSON.stringify(sortedWords);
console.log(`Words in alphabetical order: ${isAlphabetical ? 'YES (BAD)' : 'NO (GOOD)'}`);

// Check word distribution
const firstLetters = words.map(word => word[0]);
const letterCounts = {};
firstLetters.forEach(letter => {
  letterCounts[letter] = (letterCounts[letter] || 0) + 1;
});

console.log('\nFirst letter distribution:');
Object.entries(letterCounts)
  .sort(([a], [b]) => a.localeCompare(b))
  .forEach(([letter, count]) => {
    console.log(`${letter}: ${'■'.repeat(count)} (${count})`);
  });
