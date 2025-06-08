import { useState, useEffect, useCallback, useMemo } from 'react';
import { getRandomWord } from './wordList';
import { isInDictionary, checkWordOnline, dictionary } from './data/dictionary';
import './App.css';

// Component for displaying game statistics
const StatsDisplay = ({ stats, onClose }) => {
  // Close modal on escape key
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [onClose]);

  return (
    <div className="stats-modal" role="dialog" aria-modal="true" aria-labelledby="stats-heading">
      <div className="stats-content">
        <h2 id="stats-heading">Game Statistics</h2>
        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-value">{stats.gamesPlayed}</div>
            <div className="stat-label">Played</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">
              {stats.gamesPlayed > 0 
                ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) 
                : 0}%
            </div>
            <div className="stat-label">Win %</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{stats.currentStreak}</div>
            <div className="stat-label">Current Streak</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{stats.maxStreak}</div>
            <div className="stat-label">Max Streak</div>
          </div>
        </div>
        
        <h3>Guess Distribution</h3>
        <div className="guess-distribution">
          {Object.entries(stats.guessDistribution).map(([guesses, count]) => (
            <div key={guesses} className="distribution-row">
              <div className="guess-number">{guesses}</div>
              <div className="distribution-bar-container">
                <div 
                  className="distribution-bar" 
                  style={{ 
                    width: `${Math.max(
                      count / Math.max(1, Math.max(...Object.values(stats.guessDistribution)))
                      * 100, 5)}%`
                  }}
                  role="meter"
                  aria-valuemin="0"
                  aria-valuemax={Math.max(...Object.values(stats.guessDistribution))}
                  aria-valuenow={count}
                  aria-label={`${count} wins in ${guesses} guesses`}
                >
                  {count}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="close-stats" onClick={onClose} aria-label="Close statistics">Close</button>
      </div>
    </div>
  );
};

// Create tile component with animation control
const Tile = ({ letter, status, index, isRevealing, isActive, onClick }) => {
  const animationDelay = index * 0.2;
  const revealingClass = isRevealing ? 'revealing' : '';
  const activeClass = isActive ? 'active' : '';
  
  return (
    <div 
      className={`letter-tile ${status || ''} ${revealingClass} ${activeClass}`} 
      style={{ animationDelay: `${animationDelay}s` }}
      aria-label={status ? `${letter} is ${status}` : ''}
      onClick={onClick}
      role={isActive ? "button" : undefined}
      tabIndex={isActive ? 0 : undefined}
      data-letter={letter} // Store letter as data attribute
    >
      <span className="letter-content">{letter}</span>
    </div>
  );
};

// Create keyboard key component with animation
const KeyboardKey = ({ letter, status, onClick, isPressed, isSpecial, children }) => {
  const specialClass = isSpecial ? 'special-key' : '';
  const displayContent = children || letter;
  
  return (
    <div 
      className={`keyboard-key ${status || ''} ${isPressed ? 'pressed' : ''} ${specialClass}`}
      onClick={() => onClick(letter)}
      role="button"
      tabIndex="0"
      aria-label={status ? `${letter}, ${status}` : letter}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(letter);
        }
      }}
    >
      {displayContent}
    </div>
  );
};

// Component for required letters in extreme mode
const RequiredLetter = ({ letter }) => {
  return (
    <span className="required-letter-badge" aria-label={`Required letter: ${letter}`}>
      {letter}
    </span>
  );
};

// Component for fixed position letters in extreme mode
const FixedPositionLetter = ({ letter, position }) => {
  return (
    <span className="fixed-position-badge" aria-label={`Letter ${letter} at position ${position + 1}`}>
      {letter}:{position + 1}
    </span>
  );
};

function App() {
  // Stage 5: Polish, Animations & Accessibility
  const MAX_ATTEMPTS = 6;
  const STORAGE_KEY = 'wordleReactGame';
  
  // State to track the current game
  const [targetWord, setTargetWord] = useState('');
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [message, setMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});
  
  // Animation states
  const [isRevealing, setIsRevealing] = useState(false);
  const [pressedKey, setPressedKey] = useState(null);
  
  // We no longer need inputRef since we removed the visible input field
  
  // Stats tracking
  const [stats, setStats] = useState({
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}
  });

  // State to control showing/hiding stats modal
  const [showStats, setShowStats] = useState(false);

  // State for invalid word animation
  const [isInvalid, setIsInvalid] = useState(false);

  // Online dictionary is now the primary method (always enabled by default)
  // Online dictionary is always used for best validation
  // No longer toggleable, always set to true
  // We always use the online dictionary (no local fallback)
  
  // State to track if we're checking a word online
  const [isCheckingOnline, setIsCheckingOnline] = useState(false);
  const [dictionaryCheckTimer, setDictionaryCheckTimer] = useState(0);
  
  // State for Extreme mode
  const [extremeMode, setExtremeMode] = useState(false);

  // Load stats and game state from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const { savedStats, savedGame } = JSON.parse(savedData);
      
      if (savedStats) {
        setStats(savedStats);
      }
      
      if (savedGame && savedGame.inProgress) {
        // Restore in-progress game
        setTargetWord(savedGame.targetWord);
        setGuesses(savedGame.guesses);
        setIsCorrect(savedGame.isCorrect);
        setIsGameOver(savedGame.isGameOver);
        setUsedKeys(savedGame.usedKeys);
        
        // Restore extreme mode setting if it exists
        if (savedGame.extremeMode !== undefined) {
          setExtremeMode(savedGame.extremeMode);
        }
        
        if (savedGame.isGameOver) {
          setMessage(savedGame.isCorrect 
            ? 'Correct! You guessed the word!' 
            : `Game over! The word was ${savedGame.targetWord}.`);
        }
      } else {
        // Start a new game
        setTargetWord(getRandomWord());
      }
    } else {
      // First time playing - start a new game
      setTargetWord(getRandomWord());
    }
  }, []);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    if (targetWord) { // Only save once targetWord is initialized
      const gameData = {
        savedStats: stats,
        savedGame: {
          targetWord,
          guesses,
          isCorrect,
          isGameOver,
          usedKeys,
          extremeMode,
          inProgress: true
        }
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameData));
    }
  }, [targetWord, guesses, isCorrect, isGameOver, usedKeys, stats, extremeMode]);

  // Use effect to check for game over conditions
  useEffect(() => {
    // Game is over if player guessed correctly or used all attempts
    if (isCorrect || guesses.length >= MAX_ATTEMPTS) {
      setIsGameOver(true);
    }
  }, [isCorrect, guesses.length]);
  
  // Function to evaluate each letter of the guess (memoized for performance)
  const evaluateGuess = useCallback((guess) => {
    const result = [];
    const targetLetters = targetWord.split('');
    
    // First pass: Mark correct positions (green)
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === targetLetters[i]) {
        result[i] = { letter: guess[i], status: 'correct' };
        targetLetters[i] = null; // Mark as used
      }
    }
    
    // Second pass: Mark present but wrong position (yellow) or absent (gray)
    for (let i = 0; i < guess.length; i++) {
      if (!result[i]) { // Skip already processed letters
        const letterIndex = targetLetters.indexOf(guess[i]);
        if (letterIndex !== -1) {
          result[i] = { letter: guess[i], status: 'present' };
          targetLetters[letterIndex] = null; // Mark as used
        } else {
          result[i] = { letter: guess[i], status: 'absent' };
        }
      }
    }
    
    return result;
  }, [targetWord]);

  // Function to trigger invalid word animation
  const animateInvalid = useCallback((invalid) => {
    console.log(`[Animation] Setting invalid state to: ${invalid}`);
    setIsInvalid(invalid);
  }, []);

  // Function to handle submission after a word has been validated
  const handleSubmitValidatedGuess = useCallback((validatedWord) => {
    console.log(`[handleSubmitValidatedGuess] Called with word: ${validatedWord}`);
    console.log(`[handleSubmitValidatedGuess] Current state - isRevealing: ${isRevealing}, isGameOver: ${isGameOver}`);
    
    if (isRevealing || isGameOver) {
      console.log(`[handleSubmitValidatedGuess] Exiting early - isRevealing: ${isRevealing}, isGameOver: ${isGameOver}`);
      return;
    }
    
    console.log(`[handleSubmitValidatedGuess] Processing validated word: ${validatedWord}`);
    console.log(`[handleSubmitValidatedGuess] Current guesses count: ${guesses.length}`);
    console.log(`[handleSubmitValidatedGuess] Target word: ${targetWord}`);
    
    // Evaluate the guess and add it to the list with status information
    const evaluatedGuess = evaluateGuess(validatedWord);
    console.log(`[handleSubmitValidatedGuess] Evaluated guess:`, evaluatedGuess);
    
    setGuesses(prev => {
      console.log(`[handleSubmitValidatedGuess] Adding guess to list, previous count: ${prev.length}`);
      return [...prev, evaluatedGuess];
    });
    
    // Clear input and message
    console.log(`[handleSubmitValidatedGuess] Clearing input and message`);
    setGuess('');
    setMessage('');
    
    // Check if correct
    const correct = validatedWord === targetWord;
    if (correct) {
      setIsCorrect(true);
      // Update stats for win
      setStats(prev => ({
        ...prev,
        gamesPlayed: prev.gamesPlayed + 1,
        gamesWon: prev.gamesWon + 1,
        currentStreak: prev.currentStreak + 1,
        maxStreak: Math.max(prev.maxStreak, prev.currentStreak + 1),
        guessDistribution: {
          ...prev.guessDistribution,
          [guesses.length + 1]: (prev.guessDistribution[guesses.length + 1] || 0) + 1
        }
      }));
    }
    // Check if out of attempts
    else if (guesses.length + 1 >= MAX_ATTEMPTS) {
      // Update stats for loss
      setStats(prev => ({
        ...prev,
        gamesPlayed: prev.gamesPlayed + 1,
        currentStreak: 0
      }));
    }
    
    // Set the UI to revealing state
    setIsRevealing(true);
    
    // After revealing animation completes
    setTimeout(() => {
      setIsRevealing(false);
      
      // Update keyboard letter states - using the same evaluatedGuess we added to the guesses array
      const newKeys = { ...usedKeys };
      
      evaluatedGuess.forEach(({ letter, status }) => {
        const currentStatus = newKeys[letter];
        
        // Only override if current status is less precise
        if (!currentStatus || 
            (currentStatus !== 'correct' && status === 'correct') || 
            (currentStatus === 'unused' && status !== 'unused')) {
          newKeys[letter] = status;
        }
      });
      
      setUsedKeys(newKeys);
    }, 1500); // Adjusted to better match the tile animations
  }, [isRevealing, isGameOver, targetWord, guesses.length, usedKeys, evaluateGuess]);

  // Function to check if the word is valid (in our word list)
  const isValidWord = useCallback((word) => {
    // Make sure word is 5 letters
    if (word.length !== 5) {
      console.log(`Word ${word} rejected: not 5 letters`);
      return false;
    }
    
    // Convert to uppercase for dictionary check
    const upperCaseWord = word.toUpperCase();
    
    console.log(`[DEBUG] isValidWord called for word: ${upperCaseWord}`);
    console.log(`[DEBUG] Always using online dictionary, isCheckingOnline: ${isCheckingOnline}`);
    
    // Use our primary dictionary check method (dictionary.js does local+online logic)
    // This will either return true for an accepted word, or false to trigger online check
    const result = isInDictionary(upperCaseWord, true); // Always check online
    console.log(`Dictionary check for ${upperCaseWord}: ${result ? 'Valid locally' : 'Needs online check (preferred)'}`);
    
    // If the word is valid according to our dictionary check, accept it
    if (result) {
      console.log(`[isValidWord] Word '${upperCaseWord}' is valid, ACCEPTING`);
      return true;
    }
    
    // Common English words that should always be valid regardless of dictionary
    // This is a fallback if the dictionary check fails
    const commonEnglishWords = [
      "HOUSE", "WATER", "APPLE", "WORLD", "BRAIN", "LIGHT", "HEART",
      "MUSIC", "MONEY", "EARTH", "TIGER", "PLANT", "BEACH", "CLOUD"
    ];
    
    if (commonEnglishWords.includes(upperCaseWord)) {
      console.log(`[FALLBACK] Accepting common English word: ${upperCaseWord}`);
      return true;
    }
    
    // Debug mode option - can be turned off when dictionary is working reliably
    const debugModeAcceptAll = false; // Set to true to bypass all dictionary checks
    if (debugModeAcceptAll) {
      console.log(`[DEBUG MODE] Temporarily accepting all 5-letter words: ${upperCaseWord}`);
      return true;
    }
    
    // Always use online dictionary (no local fallback)
    if (!isCheckingOnline) {
      console.log(`Starting online check for ${upperCaseWord}...`);
      console.log(`checkWordOnline function type:`, typeof checkWordOnline);
      console.log(`checkWordOnline function:`, checkWordOnline);
      
      // Set checking flag and start asynchronous check
      setIsCheckingOnline(true);
      setMessage('Checking dictionary...');
      
      // Single safety timeout to ensure UI never gets stuck
      const safetyTimeoutId = setTimeout(() => {
        console.log(`SAFETY TIMEOUT: Online check taking too long for ${upperCaseWord} - rejecting word`);
        setIsCheckingOnline(false);
        setMessage('Dictionary check timed out');
        animateInvalid(true);
        setTimeout(() => {
          animateInvalid(false);
          setMessage('');
        }, 1000);
      }, 5000); // 5-second safety timeout
      
      // Perform the online check
      console.log(`About to call checkWordOnline with: ${upperCaseWord}`);
      const checkPromise = checkWordOnline(upperCaseWord);
      console.log(`checkWordOnline returned:`, checkPromise);
      
      checkPromise
        .then(isValid => {
          console.log(`[isValidWord ASYNC] Online check promise resolved for ${upperCaseWord}: ${isValid}`);
          clearTimeout(safetyTimeoutId);
          setIsCheckingOnline(false);
          
          console.log(`Online check complete for ${upperCaseWord}: ${isValid ? 'Valid' : 'Invalid'}`);
          
          if (isValid) {
            // Word is valid online, accept it as a guess
            console.log(`[isValidWord ASYNC] Word is valid, calling handleSubmitValidatedGuess with: ${upperCaseWord}`);
            setMessage('');
            handleSubmitValidatedGuess(upperCaseWord);
            console.log(`[isValidWord ASYNC] handleSubmitValidatedGuess call completed`);
          } else {
            // Word is invalid online
            console.log(`[isValidWord ASYNC] Word is invalid, showing error message`);
            setMessage('Not in dictionary');
            animateInvalid(true);
            setTimeout(() => {
              animateInvalid(false);
              setMessage('');
            }, 1000);
          }
        })
        .catch(error => {
          clearTimeout(safetyTimeoutId);
          console.error('Error in online check:', error);
          setIsCheckingOnline(false);
          setMessage('Dictionary check failed');
          animateInvalid(true);
          setTimeout(() => {
            animateInvalid(false);
            setMessage('');
          }, 1000);
        });
      
      // Return true to indicate we started an async check (don't block handleSubmitGuess)
      console.log(`[isValidWord] Returning true - async check started for ${upperCaseWord}`);
      return true;
    }
    
    // If already checking online, return false to prevent multiple simultaneous checks
    console.log(`[isValidWord] Already checking online, returning false for ${upperCaseWord}`);
    return false;
  }, [isCheckingOnline, handleSubmitValidatedGuess, animateInvalid]);
  
  // Function to check if a guess follows extreme mode rules
  const validateExtremeMode = useCallback((newGuess) => {
    // If there are no previous guesses, no constraints yet
    if (guesses.length === 0) return { valid: true };
    
    // Get the last guess with its evaluated status
    const lastGuess = guesses[guesses.length - 1];
    
    // Check if all found letters (correct and present) are used in the new guess
    const requiredLetters = [];
    const correctPositions = {};
    
    // Collect required letters and their positions
    lastGuess.forEach((letterObj, index) => {
      if (letterObj.status === 'correct') {
        requiredLetters.push(letterObj.letter);
        correctPositions[index] = letterObj.letter;
      } else if (letterObj.status === 'present') {
        requiredLetters.push(letterObj.letter);
      }
    });
    
    // Check if all required letters are used
    for (const letter of requiredLetters) {
      if (!newGuess.includes(letter)) {
        return { 
          valid: false, 
          message: `Must use the letter ${letter} in your guess` 
        };
      }
    }
    
    // Check if correct positions are maintained
    for (const [position, letter] of Object.entries(correctPositions)) {
      if (newGuess[position] !== letter) {
        return { 
          valid: false, 
          message: `Letter ${letter} must stay in position ${parseInt(position) + 1}` 
        };
      }
    }
    
    return { valid: true };
  }, [guesses]);

  // Helper function to get required letters for extreme mode
  const getRequiredLettersForExtreme = useCallback(() => {
    if (guesses.length === 0) return { letters: [], positions: {} };
    
    // Get the last guess with evaluated status
    const lastGuess = guesses[guesses.length - 1];
    
    const requiredLetters = [];
    const correctPositions = {};
    
    // Collect required letters and their positions
    lastGuess.forEach((letterObj, index) => {
      if (letterObj.status === 'correct') {
        if (!requiredLetters.includes(letterObj.letter)) {
          requiredLetters.push(letterObj.letter);
        }
        correctPositions[index] = letterObj.letter;
      } else if (letterObj.status === 'present') {
        if (!requiredLetters.includes(letterObj.letter)) {
          requiredLetters.push(letterObj.letter);
        }
      }
    });
    
    return { letters: requiredLetters, positions: correctPositions };
  }, [guesses]);

  // Handle guess submission - extracted for reuse
  const handleSubmitGuess = useCallback(() => {
    console.log(`[handleSubmitGuess] Called with guess: "${guess}"`);
    console.log(`[handleSubmitGuess] Current state - isRevealing: ${isRevealing}, isGameOver: ${isGameOver}, isCheckingOnline: ${isCheckingOnline}`);
    
    if (isRevealing || isGameOver || isCheckingOnline) {
      console.log(`[handleSubmitGuess] Early return - isRevealing: ${isRevealing}, isGameOver: ${isGameOver}, isCheckingOnline: ${isCheckingOnline}`);
      return;
    }
    
    // Convert guess to uppercase for comparison
    const formattedGuess = guess.toUpperCase();
    console.log(`[handleSubmitGuess] Formatted guess: "${formattedGuess}"`);
    
    // Basic validation for 5-letter words
    if (formattedGuess.length !== 5) {
      console.log(`[handleSubmitGuess] Invalid length: ${formattedGuess.length}`);
      setMessage('Please enter a 5-letter word');
      return;
    }
    
    // If extreme mode is enabled, validate against the rules
    if (extremeMode && guesses.length > 0) {
      const extremeValidation = validateExtremeMode(formattedGuess);
      if (!extremeValidation.valid) {
        setMessage(extremeValidation.message);
        animateInvalid(true);
        setTimeout(() => animateInvalid(false), 600);
        return;
      }
    }
    
    // Check if word is in dictionary
    console.log(`[handleSubmitGuess] Validating word: ${formattedGuess}`);
    console.log(`[handleSubmitGuess] State: always using online dictionary, isCheckingOnline=${isCheckingOnline}`);
    
    const wordIsValid = isValidWord(formattedGuess);
    console.log(`[handleSubmitGuess] isValidWord returned: ${wordIsValid}`);
    
    // Since we always use online dictionary, isValidWord will handle the async check
    if (!wordIsValid) {
      console.log(`[handleSubmitGuess] Word validation rejected or already checking...`);
      // Either the word was rejected immediately, or we're already checking online
      // In either case, don't proceed with submission
      return;
    }
    
    console.log(`[handleSubmitGuess] Word validation successful or async check started`);
    // If we get here, either:
    // 1. The word was valid locally and we can proceed immediately, OR
    // 2. An async online check was started and it will call handleSubmitValidatedGuess if valid
    // In both cases, we let the process continue
  }, [guess, isRevealing, isGameOver, isCheckingOnline, isValidWord, animateInvalid, handleSubmitValidatedGuess, extremeMode, validateExtremeMode, guesses.length]);

  // Effect for keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isGameOver || isRevealing || showStats) return;
      
      const key = e.key.toUpperCase();
      
      // Handle letter keys
      if (/^[A-Z]$/.test(key)) {
        setPressedKey(key);
        if (guess.length < 5) {
          setGuess(prev => prev + key);
        }
      }
      // Handle backspace
      else if (e.key === 'Backspace') {
        setGuess(prev => prev.slice(0, -1));
      }
      // Handle Enter key to submit guess
      else if (e.key === 'Enter' && guess.length === 5) {
        handleSubmitGuess();
      }
    };
    
    const handleKeyUp = (e) => {
      const key = e.key.toUpperCase();
      if (/^[A-Z]$/.test(key)) {
        setPressedKey(null);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [guess, isGameOver, isRevealing, showStats, handleSubmitGuess]);



  // Update stats based on game outcome
  const updateStats = useCallback((won, numGuesses) => {
    setStats(prevStats => {
      const newStats = { ...prevStats };
      newStats.gamesPlayed += 1;
      
      if (won) {
        newStats.gamesWon += 1;
        newStats.currentStreak += 1;
        newStats.maxStreak = Math.max(newStats.currentStreak, newStats.maxStreak);
        newStats.guessDistribution[numGuesses] += 1;
      } else {
        newStats.currentStreak = 0;
      }
      
      return newStats;
    });
  }, []);

  // Reset game to play again
  const resetGame = useCallback(() => {
    // Save final stats of current game if it's game over
    if (isGameOver && !localStorage.getItem(`${STORAGE_KEY}_finalized_${targetWord}`)) {
      updateStats(isCorrect, guesses.length);
      // Mark this game as finalized so we don't count it twice
      localStorage.setItem(`${STORAGE_KEY}_finalized_${targetWord}`, 'true');
    }
    
    // Start a new game
    const newTargetWord = getRandomWord();
    setTargetWord(newTargetWord);
    setGuess('');
    setGuesses([]);
    setMessage('');
    setIsCorrect(false);
    setIsGameOver(false);
    setUsedKeys({});
    
    // Announce to screen readers
    const announcement = document.createElement('div');
    announcement.className = 'sr-only';
    announcement.setAttribute('aria-live', 'assertive');
    announcement.textContent = 'New game started';
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
    
    // Save the new game state with a fresh target word
    const gameData = {
      savedStats: stats,
      savedGame: {
        targetWord: newTargetWord,
        guesses: [],
        isCorrect: false,
        isGameOver: false,
        usedKeys: {},
        extremeMode,
        inProgress: true
      }
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameData));
    

  }, [isGameOver, targetWord, isCorrect, guesses.length, updateStats, stats, extremeMode]);

  // Handle on-screen keyboard clicks
  const handleKeyClick = useCallback((key) => {
    if (isGameOver || isRevealing) return;
    
    // Handle delete button
    if (key === 'DELETE') {
      setGuess(prev => prev.slice(0, -1));
    } 
    // Handle enter button
    else if (key === 'ENTER') {
      if (guess.length === 5) {
        handleSubmitGuess();
      }
    }
    // Handle regular letter keys
    else if (guess.length < 5) {
      setGuess(prev => prev + key);
    }
    

  }, [guess, isGameOver, isRevealing, handleSubmitGuess]);

  // We've removed the handleGuess function since we're now directly using handleSubmitGuess

  // Memoize keyboard rows to prevent unnecessary re-renders
  const keyboardRows = useMemo(() => [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE']
  ], []);



  // Add timestamp to ensure cache refresh
  // Version is now simplified, no longer need random markers

  // Emergency links for testing
  // No longer used - version display is now simplified

  // Effect to handle dictionary check timer
  useEffect(() => {
    let timerId = null;
    
    if (isCheckingOnline) {
      // Reset timer when checking starts
      setDictionaryCheckTimer(0);
      
      // Start timer interval
      timerId = setInterval(() => {
        setDictionaryCheckTimer(prev => prev + 1);
      }, 1000);
    } else {
      // Clear timer when check is done
      setDictionaryCheckTimer(0);
    }
    
    // Clean up on unmount or when isCheckingOnline changes
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isCheckingOnline]);

  // Debug function - expose for browser console testing
  useEffect(() => {
    window.debugTestPiano = async () => {
      console.log('=== DEBUG: Testing PIANO from browser console ===');
      try {
        const result = await checkWordOnline('PIANO');
        console.log('checkWordOnline("PIANO") result:', result);
        return result;
      } catch (error) {
        console.error('Error in checkWordOnline:', error);
        return false;
      }
    };
    
    window.debugValidateWord = (word) => {
      console.log(`=== DEBUG: Testing isValidWord("${word}") ===`);
      return isValidWord(word);
    };
    
    console.log('Debug functions available: window.debugTestPiano() and window.debugValidateWord(word)');
  }, [isValidWord]);

  return (
    <div className="App">
      <h1 className="title">Wordle</h1>
      
      {/* Version indicator - subtle */}
      <div 
        style={{
          background: 'rgba(50, 50, 50, 0.7)', 
          color: '#aaaaaa', 
          padding: '5px 8px', 
          fontWeight: 'normal', 
          marginBottom: '20px',
          fontSize: '11px',
          borderRadius: '4px',
        }}
      >
        <div>v3.4.2</div>
      </div>
      
      {/* Online Dictionary Status */}
      <div className="dictionary-status">
        {isCheckingOnline && (
          <span className="loading-spinner">
            Checking Dictionary
            <span className="dots" style={{display: 'inline-block', width: '24px', textAlign: 'left'}}>
              <span className="dot-animation">...</span>
            </span>
            <span className="dictionary-timer" style={{fontSize: '0.7rem', opacity: '0.7', marginLeft: '5px'}}>
              (<span className="timer-count">{dictionaryCheckTimer}s</span>)
            </span>
          </span>
        )}
      </div>
      
      {/* Game Mode Toggle */}
      <div className="game-mode-toggle">
        <button 
          className={`mode-toggle-button ${extremeMode ? 'extreme' : 'normal'}`}
          onClick={() => setExtremeMode(!extremeMode)}
          aria-pressed={extremeMode}
          aria-label={`Switch to ${extremeMode ? 'normal' : 'extreme'} mode`}
        >
          {extremeMode ? 'EXTREME' : 'NORMAL'}
          <span className={`mode-indicator ${extremeMode ? 'extreme' : 'normal'}`}></span>
        </button>
        {extremeMode && (
          <div className="extreme-rules">
            <ul>
              <li>Found letters must be used in next guess</li>
              <li>Correct positions must be maintained</li>
            </ul>
            
            {guesses.length > 0 && !isGameOver && (
              <div className="extreme-requirements">
                <div className="required-letters">
                  <strong>Required Letters:</strong>{' '}
                  {getRequiredLettersForExtreme().letters.length > 0 
                    ? getRequiredLettersForExtreme().letters.map((letter, index) => (
                        <RequiredLetter key={index} letter={letter} />
                      ))
                    : 'None yet'
                  }
                </div>
                <div className="fixed-positions">
                  <strong>Fixed Positions:</strong>{' '}
                  {Object.entries(getRequiredLettersForExtreme().positions).length > 0 
                    ? Object.entries(getRequiredLettersForExtreme().positions)
                        .map(([pos, letter]) => (
                          <FixedPositionLetter 
                            key={pos} 
                            letter={letter} 
                            position={parseInt(pos)} 
                          />
                        ))
                    : 'None yet'
                  }
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Accessibility skiplink */}
      <a href="#game-controls" className="sr-only">Skip to game controls</a>
      
      <div id="game-controls" className={isInvalid ? 'shake' : ''}>
        <div className="game-buttons">
          <button 
            type="button"
            onClick={handleSubmitGuess} 
            disabled={isGameOver || guess.length !== 5 || isRevealing}
            aria-label="Submit guess"
            className="submit-guess-button"
          >
            Guess
          </button>
          {isGameOver && (
            <button 
              type="button" 
              onClick={resetGame} 
              className="reset-button"
              aria-label="Start a new game"
            >
              New Game
            </button>
          )}
          <button 
            type="button" 
            onClick={() => setShowStats(true)} 
            className="stats-button"
            aria-label="View statistics"
          >
            Stats
          </button>
        </div>
      </div>
      
      {/* Game state indicator */}
      <div 
        className="game-status" 
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="attempts">
          Attempt: {guesses.length} / {MAX_ATTEMPTS}
        </span>
        {isGameOver && (
          <span className="target-word">
            Word: {targetWord}
          </span>
        )}
      </div>
      
      {/* Display previous guesses and empty rows for remaining attempts */}
      <div 
        className="guesses-container"
        role="grid"
        aria-label="Wordle guesses grid"
      >
        {!isGameOver && guesses.length < MAX_ATTEMPTS && (
          <div className="active-row-instructions">
            Click on the active row to enter your guess
          </div>
        )}
        {/* Render completed guess rows */}
        {guesses.map((guess, guessIndex) => (
          <div 
            key={guessIndex} 
            className="guess-row"
            role="row"
            aria-label={`Guess ${guessIndex + 1}`}
          >
            {Array.isArray(guess) 
              ? guess.map((letter, letterIndex) => (
                <Tile
                  key={letterIndex}
                  letter={letter.letter}
                  status={letter.status}
                  index={letterIndex}
                  isRevealing={guessIndex === guesses.length - 1 && isRevealing}
                />
              ))
              : guess.split('').map((letter, letterIndex) => (
                <Tile
                  key={letterIndex}
                  letter={letter}
                  status={letterIndex < 5 ? 'unused' : null}
                  index={letterIndex}
                  isRevealing={false}
                />
              ))}
          </div>
        ))}
        
        {/* Current guess row */}
        {!isGameOver && guesses.length < MAX_ATTEMPTS && (
          <div 
            className="guess-row"
            role="row"
            aria-label={`Current guess, attempt ${guesses.length + 1}`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Tile
                key={`current-${i}`}
                letter={i < guess.length ? guess[i] : ''}
                status=""
                index={i}
                isRevealing={false}
                isActive={true}
              />
            ))}
          </div>
        )}
        
        {/* Render empty placeholders for remaining attempts */}
        {Array.from({ length: MAX_ATTEMPTS - guesses.length - (isGameOver ? 0 : 1) }).map((_, i) => (
          <div 
            key={`empty-${i}`} 
            className="guess-row"
            role="row"
            aria-label={`Empty row for attempt ${guesses.length + 2 + i}`}
          >
            {Array.from({ length: 5 }).map((_, j) => (
              <div 
                key={`empty-${i}-${j}`} 
                className="letter-tile empty"
                aria-label="Empty tile"
              ></div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Keyboard display */}
      <div 
        className="keyboard"
        role="group"
        aria-label="On-screen keyboard"
      >
        {keyboardRows.map((row, rowIndex) => (
          <div 
            key={`keyboard-row-${rowIndex}`} 
            className="keyboard-row"
            role="row"
          >
            {row.map((key) => {
              if (key === 'DELETE') {
                return (
                  <KeyboardKey
                    key="key-delete"
                    letter="DELETE"
                    status=""
                    onClick={handleKeyClick}
                    isPressed={pressedKey === 'Backspace'}
                    isSpecial={true}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" fill="currentColor">
                      <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"/>
                    </svg>
                  </KeyboardKey>
                );
              } else if (key === 'ENTER') {
                return (
                  <KeyboardKey
                    key="key-enter"
                    letter="ENTER"
                    status=""
                    onClick={handleKeyClick}
                    isPressed={pressedKey === 'Enter'}
                    isSpecial={true}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" fill="currentColor">
                      <path d="M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7z"/>
                    </svg>
                  </KeyboardKey>
                );
              }
              return (
                <KeyboardKey
                  key={`key-${key}`}
                  letter={key}
                  status={usedKeys[key] || ''}
                  onClick={handleKeyClick}
                  isPressed={pressedKey === key}
                />
              );
            })}
          </div>
        ))}
      </div>

      {message && (
        <div 
          className={`message ${isCorrect ? 'success' : isGameOver ? 'game-over' : 'error'}`}
          aria-live="polite"
          role="status"
        >
          {message}
        </div>
      )}
      
      {/* Statistics Modal */}
      {showStats && (
        <StatsDisplay 
          stats={stats} 
          onClose={() => setShowStats(false)} 
        />
      )}

      
      {/* Hidden live region for screen reader announcements */}
      <div 
        aria-live="assertive" 
        className="sr-only" 
        id="game-announcements"
      ></div>
    </div>
  );
}

export default App;
