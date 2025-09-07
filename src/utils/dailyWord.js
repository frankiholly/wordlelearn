// Daily word generator with pseudo-random selection - ensures same word for all users on same date
export function getDailyWord() {
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
    'BOOTH', 'BOUND', 'BRAIN', 'BRAND', 'BRASS', 'BRAVE', 'BREAD', 'BREAK', 'BREED',
    'BRICK', 'BRIDE', 'BRIEF', 'BRING', 'BROAD', 'BROKE', 'BROWN', 'BRUSH', 'BUILD', 'BUILT',
    'BUNCH', 'BURST', 'BUYER', 'CABLE', 'CACHE', 'CAMEL', 'CANDY', 'CARRY', 'CATCH',
    'CAUSE', 'CHAIN', 'CHAIR', 'CHAOS', 'CHARM', 'CHART', 'CHASE', 'CHEAP', 'CHECK', 'CHESS',
    'CHEST', 'CHIEF', 'CHILD', 'CHINA', 'CHOSE', 'CIVIC', 'CIVIL', 'CLAIM', 'CLASS',
    'CLEAN', 'CLEAR', 'CLICK', 'CLIMB', 'CLOCK', 'CLOSE', 'CLOTH', 'CLOUD', 'COACH', 'COAST',
    'COLOR', 'COMET', 'CORAL', 'COULD', 'COUNT', 'COURT', 'COVER', 'CRAFT', 'CRANE',
    'CRASH', 'CRAZY', 'CREAM', 'CREEK', 'CRIME', 'CRISP', 'CROSS', 'CROWD', 'CROWN', 'CRUDE',
    'CRUSH', 'CURVE', 'CYCLE', 'DAILY', 'DANCE', 'DATED', 'DEALT', 'DEATH', 'DEBUT', 'DELAY',
    'DEPTH', 'DEVIL', 'DIARY', 'DIGIT', 'DIRTY', 'DISCO', 'DIVER', 'DOING',
    'DOUBT', 'DOZEN', 'DRAFT', 'DRAMA', 'DRANK', 'DREAM', 'DRESS', 'DRIED', 'DRILL', 'DRINK',
    'DRIVE', 'DROVE', 'DRUNK', 'DYING', 'EAGER', 'EAGLE', 'EARLY', 'EARTH', 'EIGHT',
    'ELDER', 'ELITE', 'EMPTY', 'ENEMY', 'ENJOY', 'ENTER', 'ENTRY', 'EQUAL', 'ERROR', 'EVENT',
    'EVERY', 'EXACT', 'EXIST', 'EXTRA', 'FABLE', 'FACED', 'FAITH', 'FALSE', 'FANCY',
    'FATAL', 'FAULT', 'FEAST', 'FIBER', 'FIELD', 'FIFTH', 'FIFTY', 'FIGHT', 'FINAL',
    'FIRST', 'FIXED', 'FLAME', 'FLASH', 'FLEET', 'FLESH',
    'FLOOR', 'FLOUR', 'FLUID', 'FOCUS', 'FORCE', 'FORTH', 'FORTY', 'FORUM',
    'FOUND', 'FRAME', 'FRANK', 'FRAUD', 'FRESH', 'FRIED', 'FRONT', 'FROST', 'FRUIT', 'FULLY',
    'FUNNY', 'GENUS', 'GHOST', 'GIANT', 'GIVEN', 'GLASS',
    'GLOBE', 'GLORY', 'GLOVE', 'GOING', 'GRACE', 'GRADE', 'GRAIN',
    'GRAND', 'GRANT', 'GRAPE', 'GRAPH', 'GRASP', 'GRASS', 'GRAVE', 'GREAT', 'GREEN', 'GREET',
    'GRIEF', 'GRILL', 'GRIND', 'GROSS', 'GROUP', 'GROWN', 'GUARD', 'GUESS', 'GUEST', 'GUIDE',
    'GUILT', 'HABIT', 'HAPPY', 'HARSH', 'HASTE', 'HEART', 'HEAVY', 'HEDGE', 'HENCE',
    'HORSE', 'HOTEL', 'HOUSE', 'HUMAN', 'HUMOR', 'HURRY', 'IDEAL',
    'IMAGE', 'INDEX', 'INNER', 'INPUT', 'ISSUE', 'JOINT',
    'JUDGE', 'JUICE', 'KNIFE', 'KNOCK', 'KNOWN',
    'LABEL', 'LARGE', 'LASER', 'LATER', 'LAUGH', 'LAYER',
    'LEARN', 'LEASE', 'LEAST', 'LEAVE', 'LEDGE', 'LEGAL', 'LEMON', 'LEVEL', 'LIGHT', 'LIKED',
    'LIMIT', 'LOCAL',
    'LODGE', 'LOGIC', 'LOOSE', 'LOVED', 'LOWER', 'LUCKY', 'LUNCH', 'LYING',
    'MAGIC', 'MAJOR', 'MAKER', 'MAPLE', 'MARCH', 'MARRY', 'MATCH', 'MAYBE',
    'MAYOR', 'MEANT', 'MEDAL', 'MEDIA', 'MELON', 'MERCY',
    'METAL', 'METER', 'MIGHT', 'MINOR', 'MINUS', 'MIXED', 'MODEL',
    'MONEY', 'MONTH', 'MORAL', 'MOTOR', 'MOUNT', 'MOUSE', 'MOUTH', 'MOVED',
    'MOVIE', 'MUSIC', 'NERVE', 'NEVER', 'NEWLY', 'NIGHT', 'NOBLE', 'NOISE',
    'NORTH', 'NOTED', 'NOVEL', 'NURSE', 'OCCUR', 'OCEAN', 'OFFER', 'OFTEN',
    'OLDER', 'OLIVE', 'OPERA', 'ORDER', 'ORGAN', 'OTHER', 'OUGHT', 'OUTER', 'OWNED',
    'OWNER', 'PAINT', 'PANEL', 'PANIC', 'PAPER', 'PARTY',
    'PASTA', 'PATCH', 'PAUSE', 'PEACE', 'PEACH', 'PEARL', 'PENNY', 'PHASE',
    'PHONE', 'PHOTO', 'PIANO', 'PIECE', 'PILOT', 'PITCH', 'PIZZA',
    'PLACE', 'PLAIN', 'PLANE', 'PLANT', 'PLATE', 'PLAZA',
    'POINT', 'POKER', 'POSED', 'POUND', 'POWER', 'PRESS', 'PRICE', 'PRIDE',
    'PRIME', 'PRINT', 'PRIOR', 'PRIZE', 'PROOF', 'PROUD', 'PROVE',
    'PUNCH', 'PURSE', 'QUEST', 'QUEEN', 'QUICK', 'QUIET', 'QUITE', 'QUOTE',
    'RADIO', 'RAISE', 'RANGE', 'RAPID', 'RATIO', 'REACH',
    'READY', 'REALM', 'REBEL', 'REFER', 'RELAX', 'REPLY', 'RESET', 'RIGHT',
    'RIGID', 'RIVAL', 'RIVER', 'ROAST', 'ROBOT',
    'ROUGH', 'ROUND', 'ROUTE', 'ROYAL', 'RURAL',
    'SADLY', 'SAFER', 'SAINT', 'SALES', 'SALAD', 'SAUCE', 'SAVED', 'SCALE', 'SCARE', 'SCENE',
    'SCOPE', 'SCORE', 'SCREW', 'SEEMS', 'SENSE', 'SERVE',
    'SEVEN', 'SHADE', 'SHAKE', 'SHALL', 'SHAME', 'SHAPE', 'SHARE', 'SHARK', 'SHARP', 'SHEET',
    'SHELF', 'SHELL', 'SHIFT', 'SHINE', 'SHIRT', 'SHOCK', 'SHOOT', 'SHORT',
    'SHOWN', 'SIGHT', 'SILLY', 'SINCE', 'SIXTH', 'SIXTY',
    'SIZED', 'SKILL', 'SLEEP', 'SLIDE', 'SLOPE', 'SMALL', 'SMART', 'SMILE', 'SMOKE',
    'SNAKE', 'SNOWY', 'SOLAR', 'SOLID', 'SOLVE', 'SORRY',
    'SOUND', 'SOUTH', 'SPACE', 'SPARE', 'SPEAK', 'SPEED', 'SPELL', 'SPEND', 'SPENT',
    'SPINE', 'SPLIT', 'SPOKE', 'SPORT', 'SPRAY', 'STACK', 'STAFF', 'STAGE', 'STAKE',
    'STAMP', 'STAND', 'START', 'STATE', 'STEAM', 'STEEL', 'STEEP', 'STEER',
    'STICK', 'STILL', 'STOCK', 'STONE', 'STOOD', 'STORE', 'STORM',
    'STORY', 'STRIP', 'STUCK', 'STUDY', 'STUFF', 'STYLE', 'SUGAR', 'SUITE', 'SUPER', 'SWEAT',
    'SWEET', 'SWING', 'SWORD', 'TABLE', 'TAKEN',
    'TASTE', 'TEACH', 'THANK', 'THEFT', 'THEIR', 'THEME', 'THERE', 'THESE', 'THICK', 'THING', 'THINK', 'THIRD',
    'THOSE', 'THREE', 'THREW', 'THROW', 'THUMB', 'TIGER', 'TIGHT', 'TIRED',
    'TITLE', 'TODAY', 'TOKEN', 'TOOTH', 'TOPIC', 'TOTAL', 'TOUCH', 'TOUGH',
    'TOWER', 'TRACK', 'TRADE', 'TRAIL', 'TRAIN', 'TRAIT', 'TREAT',
    'TREND', 'TRIAL', 'TRIBE', 'TRICK', 'TRIED', 'TRUCK', 'TRULY', 'TRUNK',
    'TRUST', 'TRUTH', 'TWICE', 'TWIST', 'UNCLE', 'UNDER', 'UNDUE',
    'UNION', 'UNITY', 'UNTIL', 'UPPER', 'UPSET', 'URBAN', 'URGED', 'USAGE',
    'USING', 'USUAL', 'VALID', 'VALUE', 'VILLA', 'VIRUS', 'VISIT', 'VITAL', 'VOCAL',
    'VOICE', 'WAIST', 'WASTE', 'WATCH', 'WATER',
    'WEALTH', 'WEIRD', 'WHEEL', 'WHERE', 'WHICH', 'WHILE', 'WHITE', 'WHOLE',
    'WHOSE', 'WIDER', 'WITCH', 'WOMAN',
    'WORLD', 'WORRY', 'WORSE', 'WORST', 'WORTH', 'WOULD', 'WRITE',
    'WRONG', 'WROTE', 'YIELD', 'YOUNG', 'YOUTH'
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

export function getDayString() {
  const today = new Date();
  return new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()).toDateString();
}

export function getDayNumber() {
  const epochStart = new Date('2024-01-01');
  const today = new Date();
  const utcDate = new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  return Math.floor((utcDate - epochStart) / (1000 * 60 * 60 * 24)) + 1;
}
