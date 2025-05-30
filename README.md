# Wordle React Game

This project is an iterative implementation of a Wordle-like game built with React. The development follows a step-by-step approach, starting with a simple MVP and progressively adding features to learn React concepts.

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
