# Wordle React Game

This project is an iterative implementation of a Wordle-like game built with React. The development follows a step-by-step approach, starting with a simple MVP and progressively adding features to learn React concepts.

## Development Environment Setup

This project uses Node.js and includes several NVM (Node Version Manager) scripts to ensure consistent Node.js versions across different environments.

### Prerequisites

- **Node.js**: LTS version (recommended via NVM)
- **NVM**: For Node.js version management
- **Git**: For version control

### Node.js Version Management

The project includes several scripts to manage Node.js versions automatically:

#### Core NVM Scripts

- **`./start-with-nvm.sh`** - Start the development server with correct Node.js version
- **`./build-with-nvm.sh`** - Build the production app with correct Node.js version  
- **`./deploy-with-nvm.sh`** - Build and deploy to GitHub Pages
- **`./run-with-nvm.sh <command>`** - Run any npm/node command with correct version
- **`./check-node.sh`** - Validate and setup Node.js environment

#### Quick Start

```bash
# Start development server
./start-with-nvm.sh

# Or use the generic runner for any command
./run-with-nvm.sh npm start
./run-with-nvm.sh npm test
./run-with-nvm.sh npm run build
```

#### Production Deployment

```bash
# Build and deploy to GitHub Pages
./deploy-with-nvm.sh
```

### Testing

The project includes comprehensive tests organized in the `tests/` directory:

```bash
# Run dictionary API tests
npm run test-dictionary
npm run test-piano
npm run test-simple
npm run test-pure-online

# Or use the NVM runner
./run-with-nvm.sh npm run test-dictionary
```

See `tests/README.md` for detailed information about all available tests.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Project Overview

This Wordle clone is developed in stages, with each stage adding new features and teaching new React concepts.

### Current Version: v3.4.4

**Key Features:**
- Online dictionary validation (no local word lists)
- 5-letter word guessing game with 6 attempts
- Real-time feedback with colored tiles
- Virtual keyboard with state tracking
- Game statistics and persistence
- Responsive design and accessibility features
- Animations and polish

**Live Demo:** [https://frankiholly.github.io/wordlelearn](https://frankiholly.github.io/wordlelearn)

### Word Validation System

The game uses **online-only dictionary validation** via the [Dictionary API](https://api.dictionaryapi.dev/):
- No local word lists or fallbacks
- Real-time validation of user guesses
- Supports all valid English words
- Robust error handling with timeout protection

### Development Stages

This Wordle clone is developed in stages, with each stage adding new features and teaching new React concepts:

### Stage 1: Minimal Viable Product (MVP)
- Basic game with hardcoded target word ("REACT")
- Simple input for guessing
- Validation for 5-letter words
- Success/failure messaging

### Stage 2: Feedback on Guesses
- Letter-by-letter feedback (correct position, wrong position, not in word)
- Visual representation of guesses with colored tiles
- Multiple guesses tracking and history

### Stage 3: Multiple Guesses & Game Over
- Limited to 6 guesses like the original Wordle
- Game over detection and state management
- Win/lose state and messaging
- Keyboard display showing used letters
- Reset functionality

### Stage 4: Random Word Selection & Statistics
- Random word selection from a predefined list
- Game state persistence using localStorage
- Statistics tracking (games played, win percentage, streaks)
- Visual statistics display with guess distribution chart

### Stage 5: Polish & Performance
- Animations for tile flips and keyboard presses
- Full keyboard support for gameplay
- Accessibility improvements including ARIA attributes
- Performance optimizations with useCallback and useMemo
- Responsive design for different device sizes

## Learning Goals

### Stage 1 Learning
- Setting up a React project
- Understanding component structure
- Working with state and props
- Form handling and user input
- Conditional rendering

### Stage 2 Learning
- Working with arrays in state
- Mapping over arrays to create dynamic UI elements
- Algorithm design for letter evaluation
- Passing data through component hierarchies
- Using dynamic CSS classes based on data

### Stage 3 Learning
- Using the useEffect hook for derived state
- Managing more complex game states
- Conditional rendering based on game state
- Creating placeholder elements
- Reset functionality implementation
- CSS grid and flexbox for complex layouts

### Stage 4 Learning
- Random word selection from an array
- Local storage for game persistence
- Managing and displaying game statistics
- Using modals for UI interactions
- Multiple useEffect hooks for different purposes
- Dependency arrays in useEffect

### Stage 5 Learning
- Animations using CSS keyframes and React state
- Keyboard navigation and event handling
- Accessibility features including ARIA attributes
- React performance optimization with useCallback and useMemo
- Responsive design for different device sizes
- Component splitting for better maintainability

## Project Structure

```
wordlelearn/
├── src/                          # React source code
│   ├── App.js                   # Main application component
│   ├── data/dictionary.js       # Online dictionary validation
│   └── ...                     # Other React components and assets
├── public/                      # Static assets and HTML
├── tests/                       # Test suite (organized separately)
│   ├── scripts/                 # JavaScript test scripts
│   ├── html/                    # HTML test pages
│   ├── manual/                  # Manual testing instructions
│   └── README.md               # Test documentation
├── .github/workflows/           # GitHub Actions for deployment
├── *-with-nvm.sh               # Node.js version management scripts
└── README.md                   # This file
```

## Recent Bug Fixes (v3.4.4)

**Fixed: Valid words like "PIANO" not being accepted**
- Root cause: React useCallback dependency issues causing stale closures
- Solution: Refactored async validation logic with proper state management
- Added comprehensive test suite to prevent regression
- Improved error handling and debug logging

All word validation now works correctly with the online dictionary API.

## Troubleshooting

### Node.js Version Issues
If you encounter Node.js version conflicts:
```bash
# Check your current setup
./check-node.sh

# Use NVM scripts for all operations
./start-with-nvm.sh
./run-with-nvm.sh npm install
```

### Dictionary API Issues
If word validation isn't working:
```bash
# Test the dictionary API
npm run test-dictionary
npm run test-piano

# Check browser console for detailed logs
```

### Deployment Issues
For GitHub Pages deployment problems:
```bash
# Use the deployment script
./deploy-with-nvm.sh

# Or check the GitHub Actions workflow
```

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
