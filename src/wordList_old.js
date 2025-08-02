// Practice mode target words for the game (1000+ words different from daily words)
// These words are specifically curated to avoid overlap with the daily word list
// ensuring players get a completely different experience in practice vs daily mode
const TARGET_WORDS = [
  // Nature & Environment
  "ACRES", "ALGAE", "AMBER", "ANTIK", "BAHAY", "BANKS", "BARKS", "BASIN", "BENDS", "BIRCH",
  "BLUFF", "BOUGH", "BROOK", "BUTTE", "CAVES", "CEDAR", "CHALK", "CHASM", "CLAMS", "CLIFF",
  "COVES", "DELTA", "DENSE", "DUNES", "ELBOW", "FAUNA", "FJORD", "FLATS", "FLORA", "GRAVEL",
  "GROVE", "GULCH", "HEATH", "ISLES", "MARSH", "MESAS", "MOORS", "OASIS", "PONDS", "RIDGE",
  "ROCKY", "SANDY", "SHORE", "SWAMP", "TIDES", "TUNDRA", "VALLEY", "VISTA", "ZONES",
  
  // Animals & Creatures
  "BISON", "CHIMP", "COYOTE", "CRABS", "DOVES", "EELS", "ELKS", "FOXES", "GEESE", "GOOSE",
  "HAWKS", "HIPPO", "HYENA", "IBEX", "JACKS", "KOALA", "LIONS", "LLAMA", "LYNX", "MOOSE",
  "NEWTS", "OTTER", "OWLS", "PANDA", "QUAIL", "RAMS", "SEALS", "SHEEP", "SKUNK", "SLOTH",
  "SNAIL", "TROUT", "WALRUS", "WHALE", "ZEBRA",
  
  // Food & Cooking
  "BAGEL", "BAKED", "BASIL", "BEANS", "BROTH", "CAKES", "CHARD", "CHILI", "CIDER", "COCOA",
  "CREPE", "CURRY", "DATES", "DOUGH", "FIGS", "GARLIC", "GRAVY", "HERBS", "HONEY", "ICING",
  "JELLY", "KALE", "MANGO", "MINTS", "NUTMEG", "ONION", "PEARS", "PLUMS", "RADISH", "RICE",
  "ROLLS", "SEEDS", "SPICE", "STEAK", "SYRUP", "TACOS", "TOAST", "VANILLA",
  
  // Arts & Culture
  "ARTIST", "BALLET", "CANVAS", "DESIGN", "ETUDE", "FRESCO", "GUITAR", "HAIKU", "IMAGES",
  "JAZZ", "KILN", "LYRIC", "MURAL", "NOVEL", "OPERA", "PAINT", "QUILT", "RHYME", "SCULPT",
  "TANGO", "VERSE", "WEAVE", "YARN", "ZITHER",
  
  // Technology & Science  
  "ATOMS", "BYTES", "COILS", "DIALS", "EMITS", "FIBER", "GEARS", "HELIX", "IONIC", "JOULE",
  "KINETIC", "LASER", "MACRO", "NODES", "ORBIT", "PIXEL", "QUARK", "RADAR", "SONIC", "TESLA",
  "ULTRA", "VALVE", "WATTS", "XENON", "YIELD",
  
  // Sports & Recreation
  "ARENA", "BADGE", "CAMPS", "DARTS", "EQUIP", "FIELD", "GAMES", "HIKES", "IRONS", "JOGS",
  "KAYAK", "LANES", "MATCH", "NETS", "OARS", "POOLS", "QUOIT", "RACES", "SKIS", "TEAMS",
  "UNITS", "VAULT", "WALKS", "YARDS", "ZONES",
  
  // Transportation & Travel
  "BOATS", "CARGO", "DOCKS", "EXPRESS", "FERRY", "GATES", "HUBS", "ISLANDS", "JETS", "KAYAK",
  "LINER", "METRO", "NORTH", "OZONE", "PORTS", "QUEST", "RAILS", "SHIPS", "TAXIS", "URBAN",
  "VANS", "WINGS", "YACHT", "ZONES",
  
  // Fashion & Textiles
  "BELT", "CAPS", "DENIM", "FELT", "GEMS", "HATS", "IRIS", "JADE", "KNIT", "LACE",
  "MESH", "NAVY", "OPAL", "PLAID", "QUARTZ", "RUBY", "SILK", "TWEED", "URNS", "VEST",
  "WOOL", "YARN", "ZIPS",
  
  // Architecture & Building
  "ARCH", "BRICK", "DECOR", "EAVES", "FOYER", "GABLE", "HALLS", "IONIC", "JOISTS", "KEEPS",
  "LOFTS", "MANOR", "NICHE", "OGEE", "PATIO", "QUOIN", "RAFTS", "SILLS", "TOWER", "URNS",
  "VENTS", "WINGS", "YARDS", "ZONES",
  
  // Weather & Climate
  "BALMY", "CRISP", "DRIZZLE", "FOG", "GALES", "HAIL", "ICY", "MIST", "NIMBUS", "OZONE",
  "POLAR", "SQUALL", "TEPID", "VAPOR", "WINDY",
  
  // Household & Daily Life
  "ATTIC", "BROOM", "CHAIR", "DECKS", "EASEL", "FORKS", "GLASS", "HOOKS", "ITEMS", "JARS",
  "KEYS", "LAMPS", "MATS", "NAILS", "OVENS", "PAILS", "QUILT", "RUGS", "SOFA", "TILES",
  "URNS", "VASE", "WICKS", "YARD", "ZEST",
  
  // Business & Finance
  "AUDIT", "BANKS", "COSTS", "DEALS", "FIRMS", "GAINS", "HALLS", "ITEMS", "LOANS", "MARTS",
  "NOTES", "OFFER", "PENNY", "QUOTE", "RATES", "SALES", "TRADE", "UNITS", "VALUE", "WAGES",
  
  // Education & Learning
  "ATLAS", "BOOKS", "CLASS", "DESK", "ESSAY", "FACTS", "GRADE", "HALLS", "IDEAS", "KNOW",
  "LEARN", "MARKS", "NOTES", "OPENS", "PAGES", "QUIZ", "READS", "STUDY", "TESTS", "UNITS",
  "VOCAB", "WRITE", "YEARS", "ZONES",
  
  // Health & Wellness
  "BICEP", "CARDIO", "DIET", "ELBOW", "FITNESS", "GLANDS", "HEALTH", "IMMUNE", "JOINTS",
  "KNEES", "LUNGS", "MUSCLE", "NERVES", "ORGAN", "PULSE", "QUADS", "RELAX", "SPINE", "THIGH",
  "ULNAR", "VEINS", "WAIST", "YOGA", "ZONES",
  
  // Abstract Concepts & Emotions
  "BLISS", "CHARM", "DREAD", "ELATE", "FAITH", "GLEAM", "HOPE", "IDEAL", "JOY", "KIND",
  "LOVE", "MIRTH", "NOBLE", "PEACE", "QUEST", "RELAX", "SMILE", "TRUST", "UNITY", "VIGOR",
  "WISE", "YEARN", "ZEAL",
  
  // Tools & Instruments
  "AWLS", "BOLTS", "CLAMP", "DRILL", "FILES", "GAUGE", "HINGE", "IRONS", "JACKS", "KNIFE",
  "LATHE", "MALLET", "NAILS", "PLIERS", "RATCHET", "SAW", "TORCH", "VISE", "WRENCH", "YOKE",
  
  // Time & Seasons
  "APRIL", "DAWN", "EPOCH", "FALL", "HOUR", "JUNE", "LUNAR", "MAY", "NOON", "OCTOBER",
  "PAST", "QUARTER", "RAPID", "SOLAR", "TIME", "WEEKS", "YEAR", "ZONE",
  
  // Materials & Substances
  "ADOBE", "BRASS", "CLAY", "EBONY", "FELT", "GLASS", "HEMP", "IVORY", "JUTE", "LATEX",
  "METAL", "NYLON", "OAK", "PINE", "RESIN", "STEEL", "TAR", "VINYL", "WAX", "ZINC",
  
  // Colors & Visual
  "AQUA", "BEIGE", "CORAL", "EBONY", "FAWN", "GOLD", "HAZEL", "INDIGO", "JADE", "KHAKI",
  "LILAC", "MAUVE", "OCHRE", "PINK", "ROSE", "SAGE", "TEAL", "UMBER", "VIOLET", "WHEAT",
  
  // Communication & Language
  "ACCENT", "BABEL", "CHAT", "DIALECT", "ECHO", "FLUENT", "GOSSIP", "HELLO", "IDIOM", "JARGON",
  "LINGO", "MOTTO", "NAME", "ORAL", "PHRASE", "QUOTE", "SPEAK", "TALK", "UTTER", "VOCAL",
  "WORDS", "YELP", "ZONE",
  
  // Additional Unique Words - Set 1
  "ABBEY", "BADGE", "CABIN", "DAIRY", "EAGER", "FABRIC", "GAZE", "HABIT", "IGLOO", "JEWEL",
  "KNACK", "LABEL", "MAGIC", "NAKED", "OAKEN", "PATCH", "QUEST", "RANCH", "SANDY", "TEPID",
  "UNCLE", "VAULT", "WAGER", "YACHT", "ZESTY",
  
  // Additional Unique Words - Set 2
  "ACTOR", "BUDDY", "CEDAR", "DOZEN", "ENTER", "FAVOR", "GOODS", "HERON", "ITCH", "JOLLY",
  "KARMA", "LODGE", "MERGE", "NURSE", "ORDER", "PLANK", "QUIET", "RAPID", "SWIFT", "TOWER",
  "UNDER", "VIVID", "WORTH", "YOUTH", "ZEBRA",
  
  // Additional Unique Words - Set 3
  "ADAPT", "BRAVE", "CRISP", "DENSE", "ERUPT", "FOCUS", "GRANT", "HARSH", "INNER", "JOINT",
  "KNEEL", "LAYER", "MOTOR", "NOVEL", "ORBIT", "PAUSE", "QUAKE", "ROUGH", "SOLID", "THICK",
  "URBAN", "VIVID", "WEARY", "YIELD", "ZONAL",
  
  // Additional Unique Words - Set 4
  "ALIEN", "BENCH", "CHASE", "DODGE", "EVOKE", "FLEET", "GUILT", "HOVER", "IMPLY", "JUDGE",
  "KNOTS", "LOGIC", "MORAL", "NORMA", "ORBIT", "PRISM", "QUELL", "RALLY", "STARK", "TWIST",
  "UNITY", "VAGUE", "WHISK", "YEARN", "ZONED",
  
  // Additional Unique Words - Set 5
  "ABLED", "BLAZE", "CHURN", "DOWNS", "EDGES", "FLAIR", "GRIND", "HANDY", "INKED", "JAZZY",
  "KIOSK", "LUNAR", "MINOR", "NOTCH", "OWNED", "PARKS", "QUIRK", "RIDGE", "STEEP", "THORN",
  "USAGE", "VIVID", "WRYLY", "YOUTH", "ZONED",
  
  // Additional Unique Words - Set 6
  "AVOID", "BLUNT", "CRUMB", "DERBY", "EVERY", "FLASK", "GRASP", "HEFTY", "IMPLY", "JUMBO",
  "KNOWN", "LUMPS", "MOURN", "NUDGE", "OMITS", "PLUMP", "QUEST", "RUSTY", "SQUID", "TULIP",
  "UNWED", "VINYL", "WOVEN", "YOUTH", "ZONED",
  
  // Extended Set 7 - More Common Words
  "ABUSE", "BATCH", "CATCH", "DECAY", "ELBOW", "FANCY", "GHOST", "HOWDY", "IRONY", "JAZZY",
  "KNEAD", "LUCKY", "MESSY", "NUTTY", "OCTAL", "PANSY", "QUILL", "RAINY", "SALTY", "TRULY",
  "UNIFY", "VAULT", "WAFER", "XYLEM", "YODEL", "ZINGY",
  
  // Extended Set 8 - Action Words  
  "AGILE", "BOOST", "CLING", "DWELL", "EXERT", "FORGE", "GLIDE", "HATCH", "INCUR", "JOUST",
  "KNELT", "LURCH", "MUNCH", "NOTCH", "ORBIT", "PARCH", "QUASH", "ROMP", "SKULK", "TWIST",
  "UNBOX", "VAULT", "WHIRL", "YEAST", "ZILCH",
  
  // Extended Set 9 - Nature Extended
  "ACORN", "BEECH", "CREST", "DRIFT", "EMBER", "FERNS", "GROVE", "HERON", "IVORY", "JEWEL",
  "KNOLL", "LICHEN", "MAPLE", "NECTAR", "ORCHID", "POND", "QUAIL", "REEDS", "SEDGE", "THORN",
  "UMBEL", "VINES", "WILDS", "XYLEM", "YUCCA", "ZONAL",
  
  // Extended Set 10 - Technology Extended
  "ARRAY", "BASIC", "CACHE", "DEBUG", "EMAIL", "FIBER", "GIZMO", "HTTPS", "INDEX", "JOINS",
  "KIOSK", "LINUX", "MACRO", "NGINX", "OPTIC", "PATCH", "QUERY", "RESET", "STACK", "TOKEN",
  "UNIX", "VIRUS", "WEBEX", "XPATH", "YAHOO", "ZONES",
  
  // Extended Set 11 - Food Extended  
  "ALMOND", "BACON", "CHARD", "DAIRY", "ECLAIR", "FUDGE", "GRAPE", "HERBS", "ICING", "JELLY",
  "KEBAB", "LATTE", "MANGO", "NUTTY", "OLIVE", "PECAN", "QUESO", "RANCH", "SAUCE", "TUNA",
  "UMAMI", "VODKA", "WAFER", "YEAST", "ZESTY",
  
  // Extended Set 12 - Sports Extended
  "ARENA", "BENCH", "COACH", "DERBY", "EQUIP", "FIELD", "GLOVE", "HOOPS", "IRONS", "JOKER",
  "KAYAK", "LANES", "MEDAL", "NERF", "ORBIT", "POLES", "QUOIT", "RUGBY", "SKATE", "TRACK",
  "UNITY", "VAULT", "WATER", "YOUTH", "ZONES",
  
  // Extended Set 13 - Colors Extended
  "AMBER", "BROWN", "CORAL", "DUSKY", "ECRU", "FAWN", "GRAY", "HAZEL", "IVORY", "JADE",
  "KHAKI", "LIME", "MAUVE", "NAVY", "OCHRE", "PEACH", "QUARTZ", "ROUGE", "SEPIA", "TEAL",
  "UMBER", "VIOLET", "WHITE", "YELLOW", "ZINC",
  
  // Extended Set 14 - Business Extended
  "ASSET", "BADGE", "CLERK", "DEALS", "EQUITY", "FIRMS", "GOALS", "HIRE", "ISSUE", "JOINT",
  "KEEPS", "LEADS", "MERGE", "NODES", "ORDER", "PRIDE", "QUERY", "RATIO", "SCALE", "TRACK",
  "UNITY", "VALUE", "WORTH", "YIELD", "ZONES",
  
  // Extended Set 15 - Animals Extended
  "ALPACA", "BEARS", "CATS", "DOGS", "ELKS", "FOXES", "GOATS", "HAWKS", "IBIS", "JOEY",
  "KITES", "LAMBS", "MOLES", "NEWTS", "OWLS", "PUPS", "QUAIL", "RAMS", "SEALS", "TOADS",
  "UNAU", "VOLES", "WASPS", "YAKS", "ZEBUS",
  
  // Extended Set 16 - Materials Extended
  "ALLOY", "BRASS", "CEDAR", "DENIM", "EBONY", "FELTS", "GLASS", "HEMPS", "IRONS", "JUTES",
  "KAPOK", "LATEX", "MAPLE", "NYLON", "OAKS", "PINES", "QUART", "RESIN", "SILKS", "TEAKS",
  "URNS", "VINYL", "WOOLS", "XENON", "YARNS", "ZINCS",
  
  // Extended Set 17 - Weather Extended
  "BALMY", "CHILLY", "DAMP", "FOGGY", "GUSTY", "HUMID", "ICYS", "MISTY", "OVERS", "POLAR",
  "QUIET", "RAINY", "SUNNY", "TEPID", "UNSET", "VAPID", "WINDY", "XEROX", "YEARS", "ZONAL",
  
  // Extended Set 18 - Tools Extended
  "ANVIL", "BLADE", "CHISEL", "DRILL", "EDGER", "FILE", "GAUGE", "HAMMER", "IRON", "JIGSAW",
  "KNIFE", "LEVEL", "MALLET", "NAIL", "OPENER", "PLIER", "QUILL", "RULER", "SAW", "TORCH",
  "UTILITY", "VISE", "WRENCH", "XERUS", "YOKE", "ZONE",
  
  // Extended Set 19 - Time Extended
  "AGAIN", "BRIEF", "CLOCK", "DAYS", "EARLY", "FIRST", "GIVEN", "HOURS", "IMMED", "JUSTS",
  "KEEPS", "LASTS", "MONTH", "NOWS", "OFTEN", "PASTS", "QUICK", "RIGHT", "SOONS", "TIMES",
  "UNTIL", "VERYS", "WEEKS", "YEARS", "ZONES",
  
  // Extended Set 20 - Emotions Extended  
  "ANGRY", "BRAVE", "CALMS", "DEARS", "EAGER", "FUNNY", "GLADS", "HAPPY", "JOLLY", "KINDS",
  "LIVES", "MERRY", "NICES", "OPENS", "PROUD", "QUIET", "READY", "SWEET", "TRUES", "UPSET",
  "VIVID", "WARMS", "EXTRA", "YOUNG", "ZESTY",
  
  // Extended Set 21 - Household Extended
  "ATTIC", "BEDS", "CHAIR", "DESKS", "EASEL", "FORKS", "GLASS", "HOOKS", "ITEMS", "JARS",
  "KEYS", "LAMPS", "MATS", "NAILS", "OVENS", "PAILS", "QUILTS", "RUGS", "SOFAS", "TILES",
  "URNS", "VASES", "WICKS", "YARDS", "ZESTS",
  
  // Extended Set 22 - Action Verbs Extended
  "ACHES", "BAKES", "CALLS", "DARES", "EARNS", "FAILS", "GAINS", "HALES", "ITEMS", "JOKES",
  "KEEPS", "LOADS", "MAKES", "NAMES", "OPENS", "PLAYS", "QUITS", "READS", "SAVES", "TAKES",
  "USES", "VIEWS", "WALKS", "YELLS", "ZONES",
  
  // Extended Set 23 - Descriptive Words
  "ALERT", "BLAND", "CLEAR", "DULL", "EXACT", "FRESH", "GREAT", "HUGE", "IDEAL", "JOLLY",
  "KEEN", "LARGE", "MINOR", "NOBLE", "OVERT", "PLAIN", "QUICK", "ROUGH", "SOLID", "TIGHT",
  "ULTRA", "VIVID", "WIDE", "YEARLY", "ZONAL",
  
  // Extended Set 24 - Musical Terms
  "ALTOS", "BASSO", "CHORD", "DUETS", "ECHOS", "FLATS", "GENRE", "HYMNS", "INTRO", "JAZZS",
  "KEYS", "LUTES", "MAJOR", "NOTES", "OPUSS", "PIANOS", "QUART", "RHYME", "SCALE", "TEMPO",
  "UNITY", "VERSE", "WALTZ", "XYLOS", "YODEL", "ZONES",
  
  // Extended Set 25 - Final Set
  "ASKED", "BUILT", "CARED", "DIVED", "ENDED", "FACED", "GROWS", "HOLDS", "IRKED", "JOKED",
  "KNELT", "LIVED", "MOVED", "NOTED", "OWNED", "PACED", "QUART", "RACED", "SIDED", "TYPED",
  "URGED", "VOTED", "WAGED", "YEARS", "ZONED"
];

// Get a random word from the target words list
export const getRandomWord = () => {
  return TARGET_WORDS[Math.floor(Math.random() * TARGET_WORDS.length)];
};
