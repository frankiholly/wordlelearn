// Practice mode target words for the game (valid 5-letter words different from daily words)
// These words are specifically curated to avoid overlap with the daily word list
// ensuring players get a completely different experience in practice vs daily mode
const TARGET_WORDS = [
  // Set 1: Nature and environment words
  "ACRES", "ALGAE", "AMBER", "BANKS", "BARKS", "BASIN", "BENDS", "BIRCH", "BLUFF", "BOUGH",
  "BROOK", "BUTTE", "CAVES", "CEDAR", "CHALK", "CHASM", "CLAMS", "CLIFF", "COVES", "DELTA",
  "DENSE", "DUNES", "FAUNA", "FJORD", "FLATS", "FLORA", "GROVE", "GULCH", "HEATH", "ISLES",
  "MARSH", "MESAS", "MOORS", "OASIS", "PONDS", "RIDGE", "ROCKY", "SANDY", "SHORE", "SWAMP",
  "TIDAL", "WINDS", "WILDS", "CLEFT", "CREEK", "DRIFT", "FIELD", "GORGE", "LEAFY",

  // Set 2: Animals
  "BISON", "CHIMP", "CRABS", "DOVES", "FOXES", "GEESE", "GOOSE", "HAWKS", "HIPPO", "HYENA",
  "KOALA", "LIONS", "LLAMA", "MOOSE", "NEWTS", "OTTER", "PANDA", "QUAIL", "SEALS", "SHEEP",
  "SKUNK", "SLOTH", "SNAIL", "TROUT", "WHALE", "ZEBRA", "BEARS", "DUCKS", "FROGS", "BIRDS",
  "BEERS", "CALMS", "DEEDS", "FINDS", "HARES", "MOVES", "OPENS", "PAGES", "RATES", "APRIL",
  "BATHS", "COINS", "ELVES", "FOWLS", "GOATS", "HOMES", "WORMS",

  // Set 3: Food and cooking
  "BAGEL", "BAKED", "BASIL", "BEANS", "BROTH", "CAKES", "CHARD", "CHILI", "CIDER", "COCOA",
  "CREPE", "CURRY", "DATES", "DOUGH", "HERBS", "HONEY", "ICING", "JELLY", "MANGO", "MINTS",
  "ONION", "PASTA", "PEARS", "PLUMS", "ROLLS", "SEEDS", "SPICE", "STEAK", "SYRUP", "TACOS",
  "BREAD", "CHUNK", "CREAM", "EDGES", "FLOUR", "GRAIN", "JUICE", "MAPLE", "NUTTY", "OLIVE",
  "SALAD", "SOUPS", "TOAST", "WATER", "BERRY", "CANDY", "DRINK", "FEAST", "GRABS", "MEALS",

  // Set 4: Arts and culture
  "BLUES", "BRUSH", "DANCE", "DRUMS", "FLUTE", "GENRE", "HAIKU", "LYRIC", "MURAL", "NOVEL",
  "OPERA", "PAINT", "PIANO", "POEMS", "QUILT", "RHYME", "SALON", "TANGO", "VERSE", "WEAVE",
  "ACTOR", "BADGE", "CRAFT", "DRAMA", "EASEL", "FRAME", "HOBBY", "IMAGE", "JOKES", "KARMA",
  "LAMPS", "MAGIC", "MYTHS", "OPTIC", "PLAYS", "QUEST", "RADIO", "STORY", "TALES", "UNITY",
  "VOCAL", "WORKS", "YARNS", "ZESTS", "ALBUM", "BANDS", "CHOIR", "EPICS",

  // Set 5: Technology and science
  "ATOMS", "BYTES", "COILS", "DIALS", "EMITS", "FIBER", "GEARS", "HELIX", "IONIC", "JOULE",
  "LASER", "MACRO", "NODES", "ORBIT", "PIXEL", "QUARK", "RADAR", "SONIC", "TESLA", "ULTRA",
  "VALVE", "WATTS", "XENON", "YIELD", "ZEROS", "CHIPS", "CODES", "DEBUG", "EMAIL", "FONTS",
  "ARRAY", "BASIC", "CACHE", "DEBUT", "ERASE", "FILES", "GIZMO", "HTTPS", "INDEX", "JOINS",
  "KIOSK", "LINUX", "MICRO", "NGINX", "PATCH", "QUERY", "RESET", "STACK", "TOKEN",

  // Set 6: Sports and recreation
  "CAMPS", "DARTS", "EQUIP", "GAMES", "HIKES", "IRONS", "KAYAK", "LANES", "MATCH", "POOLS",
  "QUOIT", "RACES", "SKATE", "TEAMS", "VAULT", "WALKS", "ARENA", "BENCH", "COACH", "DERBY",
  "GLOVE", "HOOPS", "LANCE", "MEDAL", "POLES", "RUGBY", "SKIER", "TRACK", "WATER", "BATTY",
  "CLUBS", "FLAGS", "GOALS", "HURLS", "JOKED", "KITES", "LAPSE", "NEEDS", "OARED", "PICKS",
  "RACED",

  // Set 7: Transportation and travel
  "BOATS", "CARGO", "DOCKS", "FERRY", "GATES", "LINER", "METRO", "NORTH", "OZONE", "PORTS",
  "RAILS", "SHIPS", "TAXIS", "URBAN", "WINGS", "YACHT", "BIKES", "BUSES", "CARTS", "AUTOS",
  "BIKER", "CABLE", "DRIVE", "FLEET", "GOODS", "HEAVY", "INTER", "JUNKS", "KEEPS", "LOADS",
  "MOTOR", "ORDER", "PLANE", "QUICK", "ROADS", "SPEED", "TRAIN", "VANES", "WAGON", "XRAYS",
  "ZONED", "CYCLE", "DROVE", "FARED", "GEARS", "HAULS",

  // Set 8: Fashion and textiles
  "BELTS", "DENIM", "FELTS", "IVORY", "KNITS", "LACED", "NAVAL", "OPALS", "PLAID", "RUSTY",
  "SILKS", "TWEED", "VESTS", "WOOLS", "YARNS", "BOOTS", "BEADS", "CLOTH", "DRESS", "FANCY",
  "GOWNS", "HEELS", "ITEMS", "JEANS", "KNOTS", "LINED", "MODAL", "NYLON", "PURSE", "ROBES",
  "SATIN", "TULLE", "UNDER", "WOVEN", "GLOVE", "HELPS", "JESTS",

  // Set 9: Architecture and building
  "ARCED", "BRICK", "DECOR", "EAVES", "FOYER", "GABLE", "HALLS", "JOINT", "LOFTS", "MANOR",
  "NICHE", "PATIO", "QUOIN", "RAFTS", "SILLS", "TOWER", "VENTS", "WINGS", "ADOBE", "BEAMS",
  "DOORS", "ENTRY", "FLOOR", "GIRDS", "HOMES", "INNER", "JOIST", "LANDS", "MASON", "NAILS",
  "PLANS", "ROOFS", "STUDS", "TILES", "WALLS", "CELLS", "DECKS", "EDGES",

  // Set 10: Weather and climate
  "BALMY", "CRISP", "FOGGY", "GALES", "MISTY", "POLAR", "TEPID", "VAPOR", "WINDY", "CLOUD",
  "FROST", "GUSTY", "HUMID", "RAINY", "SNOWY", "STORM", "SUNNY", "CHILL", "DROPS", "CLEAR",
  "DRYER", "FAIRS", "GUSTS", "HEATS", "MILDS", "OVERS", "RAINS", "SNOWS", "OVERT",

  // Set 11: Household and daily life
  "ATTIC", "BROOM", "CHAIR", "EASEL", "FORKS", "GLASS", "HOOKS", "LAMPS", "NAILS", "OVENS",
  "PAILS", "ROUGH", "SOFAS", "TILES", "VASES", "WICKS", "BASIN", "BENCH", "COUCH", "DESKS",
  "FRAME", "GOODS", "HOUSE", "JERRY", "KNOBS", "LINEN", "MATHS", "NIGHT", "PARTY", "QUILT",
  "ROOMS", "SHELF", "TABLE", "VENTS", "WORKS", "DOORS",

  // Set 12: Business and finance
  "AUDIT", "BANKS", "COSTS", "DEALS", "FIRMS", "GAINS", "LOANS", "MARTS", "NOTES", "OFFER",
  "PENNY", "QUOTE", "RATES", "SALES", "TRADE", "VALUE", "WAGES", "BONDS", "FUNDS", "ASSET",
  "CLERK", "EQUAL", "LEADS", "MERGE", "RATIO", "SCALE", "TRACK", "WORTH", "BONUS", "CHART",
  "DRAFT", "FORMS", "HIRES", "ISSUE", "MONEY", "PRICE",

  // Set 13: Education and learning
  "ATLAS", "BOOKS", "CLASS", "ESSAY", "FACTS", "GRADE", "IDEAS", "LEARN", "MARKS", "PAGES",
  "QUIET", "READS", "STUDY", "TESTS", "VOCAB", "WRITE", "BOARD", "CHALK", "ADMIN", "BASIC",
  "CARDS", "EXAMS", "GUIDE", "HELPS", "INDEX", "KNOWS", "LINES", "MAJOR", "NOTES", "PAPER",
  "RULES", "SKILL", "TEXTS", "VIEWS", "CODED", "EDITS",

  // Set 14: Health and body
  "ANKLE", "BONES", "CHEST", "DOSES", "ELBOW", "GROWS", "HEALS", "KNEEL", "LIMBS", "NURSE",
  "PILLS", "RESTS", "SLEEP", "TONIC", "VITAL", "WALKS", "CARED", "DRUGS", "EXAMS", "RELAX",
  "SPINE",

  // Set 15: Abstract concepts and emotions
  "BLISS", "CHARM", "DREAD", "ELATE", "FAITH", "GLEAM", "IDEAL", "MIRTH", "NOBLE", "PEACE",
  "TRUST", "VIGOR", "YEARN", "BRAVE", "GRACE", "HONOR", "PRIDE", "WORTH", "ANGEL", "BLESS",
  "CALMS", "DREAM", "EAGER", "FANCY", "GLORY", "HAPPY", "INNER", "JOLLY", "KINDS", "LOVES",
  "MERCY", "NICER", "RIGHT", "SWEET", "UNITE", "VIVID", "WISER", "YOUNG", "AIMED", "CARES",
  "DEARS",

  // Set 16: Action words and miscellaneous
  "ASKED", "BUILT", "CARED", "DIVED", "ENDED", "FACED", "GROWS", "HOLDS", "JOKED", "LIVED",
  "MOVED", "NOTED", "OWNED", "PACED", "RACED", "SIDED", "TYPED", "URGED", "VOTED", "WAGED",
  "ABBEY", "CABIN", "DAIRY", "FAVOR", "HABIT", "IGLOO", "JEWEL", "KNACK", "LABEL", "MAGIC",
  "NAKED", "OAKEN", "PATCH", "RANCH", "SANDY", "UNCLE", "WAGER", "YACHT", "ZESTY", "BUDDY",
  "CEDAR", "DOZEN", "ENTER", "HERON", "LODGE", "MERGE", "ORDER", "PLANK", "RAPID", "SWIFT",
  "TOWER", "YOUTH", "ADAPT", "DENSE", "ERUPT", "FOCUS", "GRANT", "HARSH", "LAYER", "MOTOR",
  "NOVEL", "PAUSE", "QUAKE", "SOLID", "THICK", "URBAN", "WEARY", "ALIEN", "BENCH", "CHASE",
  "DODGE", "EVOKE", "FLEET", "GUILT", "HOVER", "IMPLY", "JUDGE", "KNOTS", "LOGIC", "MORAL",
  "PRISM", "QUELL", "RALLY", "STARK", "TWIST", "VAGUE", "WHISK", "AGILE", "BOOST", "CLING",
  "DWELL", "EXERT", "FORGE", "GLIDE", "HATCH", "INCUR", "JOUST", "KNELT", "LURCH", "MUNCH",
  "NOTCH", "PARCH", "QUASH", "SKULK", "UNBOX", "WHIRL", "YEAST", "ZILCH", "TRULY"
];

// Get a random word from the target words list
export const getRandomWord = () => {
  return TARGET_WORDS[Math.floor(Math.random() * TARGET_WORDS.length)];
};
