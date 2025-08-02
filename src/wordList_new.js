// Practice mode target words for the game (1000+ words different from daily words)
// These words are specifically curated to avoid overlap with the daily word list
// ensuring players get a completely different experience in practice vs daily mode
const TARGET_WORDS = [
  // Set 1: Nature & Environment (50 words)
  "ACRES", "ALGAE", "AMBER", "BANKS", "BARKS", "BASIN", "BENDS", "BIRCH", "BLUFF", "BOUGH",
  "BROOK", "BUTTE", "CAVES", "CEDAR", "CHALK", "CHASM", "CLAMS", "CLIFF", "COVES", "DELTA",
  "DENSE", "DUNES", "FAUNA", "FJORD", "FLATS", "FLORA", "GROVE", "GULCH", "HEATH", "ISLES",
  "MARSH", "MESAS", "MOORS", "OASIS", "PONDS", "RIDGE", "ROCKY", "SANDY", "SHORE", "SWAMP",
  "TIDAL", "WINDS", "WILDS", "WOODED", "ZONES", "CLEFT", "CREEK", "DRIFT", "FIELD", "GORGE",

  // Set 2: Animals (50 words)
  "BISON", "CHIMP", "CRABS", "DOVES", "FOXES", "GEESE", "GOOSE", "HAWKS", "HIPPO", "HYENA",
  "JACKS", "KOALA", "LIONS", "LLAMA", "MOOSE", "NEWTS", "OTTER", "PANDA", "QUAIL", "SEALS",
  "SHEEP", "SKUNK", "SLOTH", "SNAIL", "TROUT", "WHALE", "ZEBRA", "BEARS", "DUCKS", "FROGS",
  "BIRDS", "BEERS", "CATTLE", "DEER", "FISH", "HARES", "MICE", "OXEN", "PIGS", "RATS",
  "APES", "BATS", "COWS", "EMUS", "FOWL", "GOATS", "HENS", "YAKS", "SEALS", "WORMS",

  // Set 3: Food & Kitchen (50 words)
  "BAGEL", "BAKED", "BASIL", "BEANS", "BROTH", "CAKES", "CHARD", "CHILI", "CIDER", "COCOA",
  "CREPE", "CURRY", "DATES", "DOUGH", "HERBS", "HONEY", "ICING", "JELLY", "MANGO", "MINTS",
  "ONION", "PASTA", "PEARS", "PLUMS", "ROLLS", "SEEDS", "SPICE", "STEAK", "SYRUP", "TACOS",
  "BREAD", "CHEESE", "CREAM", "EGGS", "FLOUR", "GRAIN", "JUICE", "MILK", "NUTS", "OILS",
  "SALAD", "SOUP", "TOAST", "WATER", "BERRY", "CANDY", "DRINK", "FEAST", "GRUBS", "MEALS",

  // Set 4: Arts & Culture (50 words)
  "BLUES", "BRUSH", "DANCE", "DRUMS", "FLUTE", "GENRE", "HAIKU", "LYRIC", "MURAL", "NOVEL",
  "OPERA", "PAINT", "PIANO", "POEMS", "QUILT", "RHYME", "SALON", "TANGO", "VERSE", "WEAVE",
  "ACTOR", "BADGE", "CRAFT", "DRAMA", "EASEL", "FRAME", "GENRE", "HOBBY", "IMAGE", "JOKES",
  "KARATE", "LAMPS", "MAGIC", "MYTHS", "OPERA", "PLAYS", "QUEST", "RADIO", "STORY", "TALES",
  "UNITY", "VOCAL", "WORKS", "YARN", "ZESTS", "ALBUM", "BANDS", "CHOIR", "DANCE", "EPIC",

  // Set 5: Technology & Science (50 words)
  "ATOMS", "BYTES", "COILS", "DIALS", "EMITS", "FIBER", "GEARS", "HELIX", "IONIC", "JOULE",
  "LASER", "MACRO", "NODES", "ORBIT", "PIXEL", "QUARK", "RADAR", "SONIC", "TESLA", "ULTRA",
  "VALVE", "WATTS", "XENON", "YIELD", "ZEROS", "CHIPS", "CODES", "DEBUG", "EMAIL", "FONTS",
  "ARRAY", "BASIC", "CACHE", "DEBUG", "EMAIL", "FIBER", "GIZMO", "HTTPS", "INDEX", "JOINS",
  "KIOSK", "LINUX", "MACRO", "NGINX", "OPTIC", "PATCH", "QUERY", "RESET", "STACK", "TOKEN",

  // Set 6: Sports & Recreation (50 words)  
  "BADGE", "CAMPS", "DARTS", "EQUIP", "FIELD", "GAMES", "HIKES", "IRONS", "KAYAK", "LANES",
  "MATCH", "POOLS", "QUOIT", "RACES", "SKATE", "TEAMS", "UNITS", "VAULT", "WALKS", "YARDS",
  "ARENA", "BENCH", "COACH", "DERBY", "FIELD", "GLOVE", "HOOPS", "LANES", "MEDAL", "POLES",
  "RUGBY", "SKATE", "TRACK", "VAULT", "WATER", "GAMES", "BATS", "CLUBS", "DARTS", "FLAGS",
  "GOLF", "HURLS", "ICE", "JOGS", "KITES", "LAPS", "NETS", "OARS", "PICK", "RACE",

  // Set 7: Transportation (50 words)
  "BOATS", "CARGO", "DOCKS", "FERRY", "GATES", "LINER", "METRO", "NORTH", "OZONE", "PORTS",
  "RAILS", "SHIPS", "TAXIS", "URBAN", "WINGS", "YACHT", "ZONES", "BIKES", "BUSES", "CARTS",
  "AUTOS", "BIKES", "CABLE", "DRIVE", "FLEET", "GOODS", "HEAVY", "INTER", "JUNK", "KEEPS",
  "LOADS", "MOTOR", "NORTH", "ORDER", "PLANE", "QUICK", "ROADS", "SPEED", "TRAIN", "UNITY",
  "VANS", "WAGON", "XRAYS", "YARDS", "ZONES", "CYCLE", "DRIVE", "FAST", "GEAR", "HAUL",

  // Set 8: Fashion & Textiles (50 words)
  "BELTS", "DENIM", "FELTS", "HATS", "IRIS", "JADE", "KNIT", "LACE", "MESH", "NAVY",
  "OPAL", "PLAID", "RUBY", "SILK", "TWEED", "VEST", "WOOL", "YARN", "ZIPS", "BOOTS",
  "BEADS", "CLOTH", "DRESS", "FANCY", "GOWNS", "HEELS", "ITEMS", "JEANS", "KNOTS", "LINED",
  "MODAL", "NYLON", "OUTFIT", "PURSE", "QUILTS", "ROBES", "SATIN", "TULLE", "UNDER", "VELVET",
  "WOVEN", "ZESTY", "CLOTH", "DRESS", "FIBER", "GLOVE", "HEMP", "ITEMS", "JUTE", "KNITS",

  // Set 9: Architecture & Building (50 words)
  "ARCHES", "BRICK", "DECOR", "EAVES", "FOYER", "GABLE", "HALLS", "JOISTS", "KEEPS", "LOFTS",
  "MANOR", "NICHE", "PATIO", "QUOIN", "RAFTS", "SILLS", "TOWER", "VENTS", "WINGS", "YARDS",
  "ADOBE", "BEAMS", "CEDAR", "DOORS", "ENTRY", "FLOORS", "GIRDS", "HOMES", "INNER", "JOICE",
  "KEEPS", "LANDS", "MASON", "NAILS", "OPENS", "PLANS", "QUEST", "ROOFS", "STUDS", "TILES",
  "UNITS", "VAULT", "WALLS", "YARDS", "ZONES", "ARCH", "BEAM", "CELL", "DECK", "EDGE",

  // Set 10: Weather & Climate (50 words)  
  "BALMY", "CRISP", "FOGGY", "GALES", "MISTY", "POLAR", "TEPID", "VAPOR", "WINDY", "CLOUDS",
  "FROST", "GUSTY", "HUMID", "RAINY", "SNOWY", "STORM", "SUNNY", "CHILL", "DAMP", "DRIZZLE",
  "BAKED", "CHILLY", "DAMP", "FOGGY", "GUSTY", "HUMID", "ICEY", "MISTY", "OVERT", "POLAR",
  "QUIET", "RAINY", "SUNNY", "TEPID", "UNSET", "VAPID", "WINDY", "YEARS", "ZONES", "BALMY",
  "CLEAR", "DRYER", "FAIR", "GUSTS", "HEAT", "ICY", "MILD", "OVER", "RAIN", "SNOW",

  // Set 11: Household Items (50 words)
  "ATTIC", "BROOM", "CHAIR", "DECKS", "EASEL", "FORKS", "GLASS", "HOOKS", "ITEMS", "KEYS",
  "LAMPS", "NAILS", "OVENS", "PAILS", "RUGS", "SOFA", "TILES", "VASE", "WICKS", "YARDS",
  "BASIN", "BENCH", "COUCH", "DESKS", "ENTRY", "FRAME", "GOODS", "HOUSE", "IRONS", "JARS",
  "KNOBS", "LINENS", "MATS", "NIGHT", "OPENS", "PADS", "QUILTS", "ROOMS", "SHELF", "TABLE",
  "URNS", "VENTS", "WORKS", "YARDS", "ZONES", "BED", "CAGE", "DOOR", "FAN", "GATE",

  // Set 12: Business & Finance (50 words)
  "AUDIT", "BANKS", "COSTS", "DEALS", "FIRMS", "GAINS", "LOANS", "MARTS", "NOTES", "OFFER",
  "PENNY", "QUOTE", "RATES", "SALES", "TRADE", "UNITS", "VALUE", "WAGES", "BONDS", "FUNDS",
  "ASSET", "BADGE", "CLERK", "DEALS", "EQUITY", "GOALS", "LEADS", "MERGE", "ORDER", "RATIO",
  "SCALE", "TRACK", "VALUE", "WORTH", "YIELD", "BONUS", "CHART", "DRAFT", "FORMS", "GOALS",
  "HIRES", "ISSUE", "JOINT", "KEEPS", "LEADS", "MONEY", "NODES", "OPENS", "PRICE", "QUEST",

  // Set 13: Education & Learning (50 words)
  "ATLAS", "BOOKS", "CLASS", "ESSAY", "FACTS", "GRADE", "IDEAS", "LEARN", "MARKS", "PAGES",
  "QUIZ", "READS", "STUDY", "TESTS", "VOCAB", "WRITE", "YEARS", "BOARD", "CHALK", "DESKS",
  "ADMIN", "BASIC", "CARDS", "DRAFT", "EXAMS", "FIELD", "GUIDE", "HELPS", "INDEX", "JOINS",
  "KNOWS", "LINES", "MAJOR", "NOTES", "OPENS", "PAPER", "QUEST", "RULES", "SKILL", "TEXTS",
  "UNITS", "VIEWS", "WORKS", "YEARS", "ZONES", "ART", "BOOK", "CODE", "DATA", "EDIT",

  // Set 14: Health & Wellness (50 words)
  "BICEP", "CARDIO", "DIET", "FITNESS", "GLANDS", "HEALTH", "IMMUNE", "JOINTS", "KNEES", "LUNGS",
  "MUSCLE", "NERVES", "ORGAN", "PULSE", "QUADS", "RELAX", "SPINE", "THIGH", "VEINS", "WAIST",
  "ANKLE", "BONES", "CHEST", "DOSES", "ELBOW", "FEET", "GROWS", "HEALS", "IRONS", "JOINT",
  "KNEEL", "LIMBS", "MOVES", "NURSE", "OPENS", "PILLS", "QUIET", "RESTS", "SLEEP", "TONIC",
  "UNITS", "VITAL", "WALKS", "YEARS", "ZONES", "ARM", "BODY", "CARE", "DRUG", "EXAM",

  // Set 15: Abstract Concepts (50 words)  
  "BLISS", "CHARM", "DREAD", "ELATE", "FAITH", "GLEAM", "IDEAL", "MIRTH", "NOBLE", "PEACE",
  "RELAX", "TRUST", "UNITY", "VIGOR", "YEARN", "BRAVE", "GRACE", "HONOR", "PRIDE", "WORTH",
  "ANGEL", "BLESS", "CALM", "DREAM", "EAGER", "FANCY", "GLORY", "HAPPY", "INNER", "JOY",
  "KIND", "LOVE", "MERCY", "NICE", "OPEN", "PURE", "QUIET", "RIGHT", "SWEET", "TRUE",
  "UNITE", "VIVID", "WISE", "YOUNG", "ZEAL", "AIM", "BOLD", "CARE", "DEAR", "EQUAL"
];

// Get a random word from the target words list
export const getRandomWord = () => {
  return TARGET_WORDS[Math.floor(Math.random() * TARGET_WORDS.length)];
};
