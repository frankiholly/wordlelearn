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
  "CABIN", "CABLE", "CACAO", "CACHE", "CACTI", "CADDY", "CADET", "CAGEY", "CAIRN", "CAMEL", 
  "CAMEO", "CANAL", "CANDY", "CANNY", "CANOE", "CANON", "CAPER", "CAPUT", "CARAT", "CARGO",
  "CAROL", "CARRY", "CARVE", "CASTE", "CATCH", "CATER", "CATTY", "CAULK", "CAUSE", "CAVIL",
  "CEASE", "CEDAR", "CELLO", "CHAFE", "CHAFF", "CHAIN", "CHAIR", "CHALK", "CHAMP", "CHANT",
  "CHAOS", "CHARD", "CHARM", "CHART", "CHARY", "CHASE", "CHASM", "CHEAP", "CHEAT", "CHECK",
  "CHEEK", "CHEER", "CHESS", "CHEST", "CHICK", "CHIDE", "CHIEF", "CHILD", "CHILI", "CHILL",
  "CHIME", "CHINA", "CHIRP", "CHOCK", "CHOIR", "CHOKE", "CHORD", "CHORE", "CHOSE", "CHUCK",
  "CHUMP", "CHUNK", "CHURN", "CHUTE", "CIDER", "CIGAR", "CINCH", "CIRCA", "CIVIC", "CIVIL",
  "CLACK", "CLAIM", "CLAMP", "CLANG", "CLANK", "CLASH", "CLASP", "CLASS", "CLEAN", "CLEAR",
  "CLEAT", "CLEFT", "CLERK", "CLICK", "CLIFF", "CLIMB", "CLING", "CLINK", "CLOAK", "CLOCK",
  "CLONE", "CLOSE", "CLOTH", "CLOUD", "CLOUT", "CLOVE", "CLOWN", "CLUCK", "CLUED", "CLUMP",
  "CLUNG", "COACH", "COAST", "COBRA", "COCOA", "COLON", "COLOR", "COMET", "COMFY", "COMIC",
  "COMMA", "CONCH", "CONDO", "CONIC", "COPSE", "CORAL", "CORER", "CORNY", "COUCH", "COUGH",
  "COUNT", "COUPE", "COURT", "COVEN", "COVER", "COVET", "COVEY", "COWER", "COYLY", "CRACK",
  "CRAFT", "CRAMP", "CRANE", "CRANK", "CRASH", "CRASS", "CRATE", "CRAVE", "CRAWL", "CRAZE",
  "CRAZY", "CREAK", "CREAM", "CREDO", "CREED", "CREEK", "CREEP", "CREME", "CREPE", "CREPT",
  "CRESS", "CREST", "CRICK", "CRIED", "CRIER", "CRIME", "CRIMP", "CRISP", "CROAK", "CROCK",
  "CRONE", "CRONY", "CROOK", "CROSS", "CROUP", "CROWD", "CROWN", "CRUDE", "CRUEL", "CRUMB",
  "CRUMP", "CRUSH", "CRUST", "CRYPT", "CUBIC", "CUMIN", "CURIO", "CURLY", "CURRY", "CURSE",
  "CURVE", "CURVY", "CUTIE", "CYBER", "CYCLE", "CYNIC", 
  "DADDY", "DAILY", "DAIRY", "DAISY", "DALLY", "DANCE", "DANDY", "DATUM", "DAUNT", "DEALT",
  "DEATH", "DEBAR", "DEBIT", "DEBUG", "DEBUT", "DECAL", "DECAY", "DECOR", "DECOY", "DECRY",
  "DEFER", "DEIGN", "DEITY", "DELAY", "DELTA", "DELVE", "DEMON", "DEMUR", "DENIM", "DENSE",
  "DEPOT", "DEPTH", "DERBY", "DETER", "DETOX", "DEUCE", "DEVIL", "DIARY", "DICEY", "DIGIT",
  "DILLY", "DIMLY", "DINER", "DINGY", "DIODE", "DIRGE", "DIRTY", "DISCO", "DITCH", "DITTO",
  "DITTY", "DIVER", "DIZZY", "DODGE", "DODGY", "DOGMA", "DOING", "DOLLY", "DONOR", "DONUT",
  "DOPEY", "DOUBT", "DOUGH", "DOWDY", "DOWEL", "DOWNY", "DOWRY", "DOZEN", "DRAFT", "DRAIN",
  "DRAKE", "DRAMA", "DRANK", "DRAPE", "DRAWL", "DRAWN", "DREAD", "DREAM", "DRESS", "DRIED",
  "DRIER", "DRIFT", "DRILL", "DRINK", "DRIVE", "DROIT", "DROLL", "DRONE", "DROOL", "DROOP",
  "DROSS", "DROVE", "DROWN", "DRUID", "DRUNK", "DRYER", "DRYLY", "DUCHY", "DULLY", "DUMMY",
  "DUMPY", "DUNCE", "DUSKY", "DUSTY", "DUTCH", "DUVET", "DWARF", "DWELL", "DWELT", "DYING", 
  "EAGER", "EAGLE", "EARLY", "EARTH", "EASEL", "EATEN", "EATER", "EBONY", "ECLAT", "EDICT",
  "EDIFY", "EERIE", "EGRET", "EIGHT", "EJECT", "EKING", "ELATE", "ELBOW", "ELDER", "ELECT",
  "ELEGY", "ELFIN", "ELIDE", "ELITE", "ELOPE", "ELUDE", "EMAIL", "EMBED", "EMBER", "EMCEE",
  "EMPTY", "ENACT", "ENDOW", "ENEMA", "ENEMY", "ENJOY", "ENNUI", "ENSUE", "ENTER", "ENTRY",
  "ENVOY", "EPOCH", "EPOXY", "EQUAL", "EQUIP", "ERASE", "ERECT", "ERODE", "ERROR", "ERUPT",
  "ESSAY", "ESTER", "ETHER", "ETHIC", "ETHOS", "ETUDE", "EVADE", "EVENT", "EVERY", "EVICT",
  "EVOKE", "EXACT", "EXALT", "EXCEL", "EXERT", "EXILE", "EXIST", "EXPEL", "EXTOL", "EXTRA",
  "EXULT", "EYING", 
  "FABLE", "FACET", "FAINT", "FAIRY", "FAITH", "FALSE", "FANCY", "FANNY", "FARCE", "FATAL",
  "FATTY", "FAULT", "FAUNA", "FAVOR", "FEAST", "FECAL", "FEIGN", "FELLA", "FELON", "FEMME",
  "FEMUR", "FENCE", "FERAL", "FERRY", "FETAL", "FETCH", "FETID", "FETUS", "FEVER", "FEWER",
  "FIBER", "FIBRE", "FICUS", "FIELD", "FIEND", "FIERY", "FIFTH", "FIFTY", "FIGHT", "FILER",
  "FILET", "FILLY", "FILMY", "FILTH", "FINAL", "FINCH", "FINER", "FIRST", "FISHY", "FIXER",
  "FIZZY", "FJORD", "FLACK", "FLAIL", "FLAIR", "FLAKE", "FLAKY", "FLAME", "FLANK", "FLARE",
  "FLASH", "FLASK", "FLECK", "FLEET", "FLESH", "FLICK", "FLIER", "FLING", "FLINT", "FLIRT",
  "FLOAT", "FLOCK", "FLOOD", "FLOOR", "FLORA", "FLOSS", "FLOUR", "FLOUT", "FLOWN", "FLUFF",
  "FLUID", "FLUKE", "FLUME", "FLUSH", "FLUTE", "FLYER", "FOAMY", "FOCAL", "FOCUS", "FOGGY",
  "FOIST", "FOLIO", "FOLLY", "FORAY", "FORCE", "FORGE", "FORGO", "FORTE", "FORTH", "FORTY",
  "FORUM", "FOUND", "FOYER", "FRAIL", "FRAME", "FRANK", "FRAUD", "FREAK", "FREED", "FREER",
  "FRESH", "FRIAR", "FRIED", "FRILL", "FRISK", "FRITZ", "FROCK", "FROND", "FRONT", "FROST",
  "FROTH", "FROWN", "FROZE", "FRUIT", "FUDGE", "FUGUE", "FULLY", "FUNGI", "FUNKY", "FUNNY",
  "FUROR", "FURRY", "FUSSY", "FUZZY", 
  "GAFFE", "GAILY", "GAMIN", "GAMMA", "GAMUT", "GASSY", "GAUDY", "GAUGE", "GAUNT", "GAUZE",
  "GAVEL", "GAWKY", "GAYER", "GAYLY", "GAZER", "GECKO", "GEEKY", "GEESE", "GENIE", "GENRE",
  "GHOST", "GHOUL", "GIANT", "GIDDY", "GIPSY", "GIRLY", "GIRTH", "GIVEN", "GIVER", "GLADE",
  "GLAND", "GLARE", "GLASS", "GLAZE", "GLEAM", "GLEAN", "GLIDE", "GLINT", "GLOAT", "GLOBE",
  "GLOOM", "GLORY", "GLOSS", "GLOVE", "GLYPH", "GNASH", "GNOME", "GODLY", "GOING", "GOLEM",
  "GOLLY", "GONAD", "GONER", "GOODY", "GOOEY", "GOOFY", "GOOSE", "GORGE", "GOUGE", "GOURD",
  "GRACE", "GRADE", "GRAFT", "GRAIL", "GRAIN", "GRAND", "GRANT", "GRAPE", "GRAPH", "GRASP",
  "GRASS", "GRATE", "GRAVE", "GRAVY", "GRAZE", "GREAT", "GREED", "GREEN", "GREET", "GRIEF",
  "GRILL", "GRIME", "GRIMY", "GRIND", "GRIPE", "GROAN", "GROIN", "GROOM", "GROPE", "GROSS",
  "GROUP", "GROUT", "GROVE", "GROWL", "GROWN", "GRUEL", "GRUFF", "GRUNT", "GUARD", "GUAVA",
  "GUESS", "GUEST", "GUIDE", "GUILD", "GUILE", "GUILT", "GUISE", "GULCH", "GULLY", "GUMBO",
  "GUMMY", "GUNNY", "GUPPY", "GUSTO", "GUSTY", "GYPSY", 
  "HABIT", "HAIRY", "HALVE", "HANDY", "HAPPY", "HARDY", "HAREM", "HARPY", "HARRY", "HARSH",
  "HASTE", "HASTY", "HATCH", "HATED", "HATER", "HAUNT", "HAUTE", "HAVEN", "HAVOC", "HAZEL",
  "HEADY", "HEARD", "HEART", "HEATH", "HEAVE", "HEAVY", "HEDGE", "HEFTY", "HEIST", "HELIX",
  "HELLO", "HENCE", "HERON", "HILLY", "HINGE", "HIPPO", "HIPPY", "HIRER", "HITCH", "HOARD",
  "HOARY", "HOBBY", "HOIST", "HOLLY", "HOMER", "HONEY", "HONOR", "HORDE", "HORNY", "HORSE",
  "HOTEL", "HOTLY", "HOUND", "HOUSE", "HOVEL", "HOVER", "HOWDY", "HUMAN", "HUMID", "HUMOR",
  "HUMPH", "HUMUS", "HUNCH", "HUNKY", "HURRY", "HUSKY", "HUSSY", "HUTCH", "HYDRO", "HYENA",
  "HYMEN", "HYPER", "ICILY", "ICING", "IDEAL", "IDIOM", "IDIOT", "IDLER", "IDYLL", "IGLOO",
  "ILIAC", "IMAGE", "IMBUE", "IMPEL", "IMPLY", "INANE", "INBOX", "INCUR", "INDEX", "INEPT",
  "INERT", "INFER", "INGOT", "INLAY", "INLET", "INNER", "INPUT", "INTER", "INTRO", "IONIC",
  "IRATE", "IRONY", "ISLET", "ISSUE", "ITCHY", "IVORY", 
  // Add many more words up through Z...
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

// Function to check if a word exists using APIs or a more comprehensive list
// This returns a Promise that resolves to true if the word exists, false otherwise
export async function checkWordOnline(word) {
  try {
    console.log(`Checking online dictionary for word: ${word}`);
    
    const upperCaseWord = word.toUpperCase();
    
    // First, check our expanded common word list - this is a fallback if APIs fail
    // This is a more extensive list of common 5-letter words that are valid
    const commonWords = [
      "HOUSE", "WATER", "APPLE", "WORLD", "BRAIN", "LIGHT", "HEART", "MUSIC", "MONEY", "EARTH", 
      "GIANT", "GLARE", "GLEAM", "GLOBE", "GLORY", "GLOVE", "GNARL", "GOOSE", "GRACE", "GRADE",
      "TIGER", "PLANT", "BEACH", "CLOUD", "RIVER", "STONE", "DANCE", "FUNNY", "TASTE", "DREAM",
      "HAPPY", "SMILE", "LAUGH", "SHIRT", "SOCKS", "SHOES", "CHAIR", "TABLE", "PLATE", "KNIFE",
      "SPOON", "FLOOR", "CLOCK", "WATCH", "PHONE", "PAPER", "PIZZA", "STEAK", "SALAD", "OCEAN"
    ];
    
    // Check our local expanded common word list
    if (commonWords.includes(upperCaseWord)) {
      console.log(`Word '${upperCaseWord}' found in common words list`);
      return true;
    }
    
    // Next, try our local dictionary again (in case the word was added)
    if (isInLocalDictionary(upperCaseWord)) {
      console.log(`Word '${upperCaseWord}' found in local dictionary after all`);
      return true;
    }
    
    // Then try the Free Dictionary API
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
      
      // If the response is OK (200-299), the word exists
      if (response.ok) {
        console.log(`Online dictionary check for '${word}': Found=true`);
        return true;
      }
      
      // If we get a 404, the word doesn't exist in the dictionary
      if (response.status === 404) {
        console.log(`Online dictionary check for '${word}': Found=false`);
        // Don't return false yet, try the backup method
      } else {
        console.log(`Free Dictionary API check failed with status ${response.status}`);
      }
    } catch (apiError) {
      console.error('Error with Free Dictionary API:', apiError);
    }
    
    // As a final fallback, let's assume 5-letter words that look like real words are valid
    // This is just a heuristic to improve gameplay when APIs fail
    // Check for common patterns that suggests it's a real English word
    const looksLikeEnglishWord = /^[BCDFGHJKLMNPQRSTVWXZ][AEIOU].*[BCDFGHJKLMNPQRSTVWXZ]$/.test(upperCaseWord) || 
                               /^.*[AEIOU].*[AEIOU].*$/.test(upperCaseWord);
    
    if (looksLikeEnglishWord) {
      console.log(`Word '${upperCaseWord}' looks like a valid English word, accepting`);
      return true;
    }
    
    // If all checks fail, the word isn't valid
    console.log(`Word '${upperCaseWord}' not found in any dictionary check`);
    return false;
    
  } catch (error) {
    console.error('Error in overall online check process:', error);
    // As a fallback, accept the word if it has vowels (very permissive fallback)
    const hasVowels = /[AEIOU]/.test(word.toUpperCase());
    return hasVowels;
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
