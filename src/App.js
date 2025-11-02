import { useState, useEffect, useCallback, useMemo } from 'react';
import { getRandomWord } from './wordList';
import { isInDictionary, checkWordOnline, dictionary } from './data/dictionary';
import { getDailyWord, getDayString, getDayNumber } from './utils/dailyWord';
import { saveDailyProgress, loadDailyProgress, isDailyWordCompleted, getCurrentDailyProgress, shouldStartNewDaily } from './utils/dailyProgress';
import { savePracticeProgress, loadPracticeProgress, isPracticeGameInProgress, canStartNewPracticeGame, clearPracticeProgress } from './utils/practiceProgress';
import { celebrationAudio } from './utils/celebrationAudio';
import DailyStatsModal from './components/DailyStatsModal';
import ExtremeWinCelebration from './components/ExtremeWinCelebration';
import VERSION_CONFIG from './config/version';
import celebrateMusic from './assets/audio/celebrate.mp3';
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

// Component for absent letters in extreme mode
const AbsentLetter = ({ letter }) => {
  return (
    <span className="absent-letter-badge" aria-label={`Forbidden letter: ${letter}`}>
      {letter}
    </span>
  );
};

// Component for wrong position letters in extreme mode
const WrongPositionLetter = ({ letter, positions }) => {
  return (
    <span className="wrong-position-badge" aria-label={`Letter ${letter} cannot be in positions ${positions.join(', ')}`}>
      {letter}:❌{positions.join(',')}
    </span>
  );
};

function App() {
  // Stage 5: Polish, Animations & Accessibility
  const MAX_ATTEMPTS = 6;
  const STORAGE_KEY = 'wordleReactGame';
  
  // Daily word state
  const [gameMode, setGameMode] = useState('daily'); // 'daily' or 'practice'
  const [dailyWord, setDailyWord] = useState('');
  const [dayString, setDayString] = useState('');
  const [dayNumber, setDayNumber] = useState(0);
  const [dailyCompleted, setDailyCompleted] = useState(false);
  const [showDailyStats, setShowDailyStats] = useState(false);
  
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
  const [validatedWord, setValidatedWord] = useState('');
  
  // Dictionary status display (persistent space for user feedback)
  const [dictionaryStatus, setDictionaryStatus] = useState({
    type: '', // 'checking', 'valid', 'invalid', 'timeout', 'error'
    message: '',
    word: ''
  });
  
  // Floating error dialog for dictionary errors (shows above active guess)
  const [floatingDictionaryError, setFloatingDictionaryError] = useState({
    show: false,
    message: '',
    word: ''
  });
  
  // Shake animation for invalid words
  const [shakeInvalid, setShakeInvalid] = useState(false);
  
  // State for Extreme mode
  const [extremeMode, setExtremeMode] = useState(false);
  
  // Debug extreme mode changes
  useEffect(() => {
    const stack = new Error().stack;
    console.log(`[DEBUG] Extreme mode changed to: ${extremeMode}`);
    console.log('[DEBUG] Stack trace:', stack?.split('\n').slice(1, 4).join('\n'));
  }, [extremeMode]);
  
  // State for extreme win celebration
  const [showExtremeCelebration, setShowExtremeCelebration] = useState(false);

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
        // Check for practice game in progress
        const practiceProgress = loadPracticeProgress();
        if (practiceProgress && gameMode === 'practice') {
          setTargetWord(practiceProgress.word);
          setGuesses(practiceProgress.guesses);
          setUsedKeys(practiceProgress.usedKeys);
          setIsGameOver(practiceProgress.isGameOver);
          setIsCorrect(practiceProgress.isWinner);
          
          // Restore extreme mode setting if it exists
          if (practiceProgress && practiceProgress.extremeMode !== undefined) {
            setExtremeMode(practiceProgress.extremeMode);
          }
          
          if (practiceProgress.isGameOver) {
            setMessage(practiceProgress.isWinner ? 'Correct! You guessed the word!' : `Game over! The word was ${practiceProgress.word}.`);
          }
        } else {
          // Start a new game
          setTargetWord(getRandomWord());
        }
      }
    } else {
      // First time playing - start a new game
      setTargetWord(getRandomWord());
    }
  }, [gameMode]);

  // Initialize daily word and check completion status
  useEffect(() => {
    const today = getDayString();
    const todayNumber = getDayNumber();
    const todayWord = getDailyWord();
    
    setDayString(today);
    setDayNumber(todayNumber);
    setDailyWord(todayWord);
    
    // Get current daily progress for today's word
    const currentProgress = getCurrentDailyProgress(today, todayWord);
    
    if (currentProgress) {
      // Progress exists for today's word - load it
      setDailyCompleted(currentProgress.isGameOver);
      setTargetWord(currentProgress.word);
      setGuesses(currentProgress.guesses);
      setUsedKeys(currentProgress.usedKeys);
      setIsGameOver(currentProgress.isGameOver);
      setIsCorrect(currentProgress.isWinner);
      
      // Restore extreme mode setting if it exists
      if (currentProgress.extremeMode !== undefined) {
        setExtremeMode(currentProgress.extremeMode);
      }
      
      if (currentProgress.isGameOver) {
        setMessage(currentProgress.isWinner ? 'Congratulations!' : `The word was ${currentProgress.word}`);
      }
      setGuess(''); // Clear current guess
      setValidatedWord('');
    } else {
      // No progress for today's word or new word available - start fresh
      setDailyCompleted(false);
      setTargetWord(todayWord);
      setGuesses([]);
      setUsedKeys({});
      setIsGameOver(false);
      setIsCorrect(false);
      setMessage('');
      setGuess('');
      setValidatedWord('');
    }
  }, [gameMode]);

  // Save daily progress when game state changes (including incomplete games)
  useEffect(() => {
    if (gameMode === 'daily' && targetWord && targetWord === dailyWord) {
      saveDailyProgress(dayString, {
        targetWord,
        guesses,
        isGameOver,
        isWinner: isCorrect,
        usedKeys,
        extremeMode
      });
      
      if (isGameOver && !dailyCompleted) {
        setDailyCompleted(true);
      }
    }
  }, [gameMode, targetWord, dailyWord, dayString, guesses, isGameOver, isCorrect, usedKeys, dailyCompleted, extremeMode]);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    if (targetWord) { // Only save once targetWord is initialized
      if (gameMode === 'daily') {
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
      } else if (gameMode === 'practice') {
        // Save practice game progress
        savePracticeProgress(targetWord, guesses, usedKeys, isGameOver, isCorrect, extremeMode);
        
        // Also save stats for practice mode
        const gameData = {
          savedStats: stats
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(gameData));
      }
    }
  }, [targetWord, guesses, isCorrect, isGameOver, usedKeys, stats, extremeMode, gameMode]);

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
    if (isRevealing || isGameOver) {
      return;
    }
    
    // Evaluate the guess and add it to the list with status information
    const evaluatedGuess = evaluateGuess(validatedWord);
    
    // Get the current guess count before updating
    const currentGuessCount = guesses.length;
    const nextGuessNumber = currentGuessCount + 1;
    
    setGuesses(prev => [...prev, evaluatedGuess]);
    
    // Clear input and message
    setGuess('');
    setMessage('');
    
    // Check if correct
    const correct = validatedWord === targetWord;
    if (correct) {
      setIsCorrect(true);
      
      console.log(`[DEBUG] Win detected! extremeMode: ${extremeMode}, validatedWord: ${validatedWord}, targetWord: ${targetWord}`);
      console.log(`[DEBUG] Browser info: ${navigator.userAgent}`);
      console.log(`[DEBUG] Platform: ${navigator.platform}`);
      
      // Trigger extreme win celebration if in extreme mode (with delay to let word reveal complete)
      if (extremeMode) {
        console.log('[EXTREME WIN] Triggering extreme celebration with 3-second delay');
        console.log(`[EXTREME WIN] Current showExtremeCelebration state: ${showExtremeCelebration}`);
        
        // Add a 3-second delay to ensure word reveal animation completes fully
        setTimeout(() => {
          console.log('[EXTREME WIN] Timeout completed, setting showExtremeCelebration to true');
          console.log(`[EXTREME WIN] Before setState - showExtremeCelebration: ${showExtremeCelebration}`);
          setShowExtremeCelebration(true);
          console.log('[EXTREME WIN] setState called');
          
          // Additional debug after a small delay to confirm state change
          setTimeout(() => {
            console.log(`[EXTREME WIN] After setState - showExtremeCelebration should be true`);
          }, 100);
        }, 3000);
      } else {
        console.log('[DEBUG] Not in extreme mode, skipping extreme celebration');
      }
      
      // Update stats for win
      setStats(prev => ({
        ...prev,
        gamesPlayed: prev.gamesPlayed + 1,
        gamesWon: prev.gamesWon + 1,
        currentStreak: prev.currentStreak + 1,
        maxStreak: Math.max(prev.maxStreak, prev.currentStreak + 1),
        guessDistribution: {
          ...prev.guessDistribution,
          [nextGuessNumber]: (prev.guessDistribution[nextGuessNumber] || 0) + 1
        }
      }));
    }
    // Check if out of attempts
    else if (nextGuessNumber >= MAX_ATTEMPTS) {
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
      
      // Update keyboard letter states
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
    }, 1500);
  }, [isRevealing, isGameOver, targetWord, guesses, usedKeys, evaluateGuess]);

  // Handle validated word submission
  useEffect(() => {
    if (validatedWord && !isRevealing && !isGameOver) {
      console.log(`[VALIDATED WORD EFFECT] Processing validated word: ${validatedWord}`);
      handleSubmitValidatedGuess(validatedWord);
      setValidatedWord(''); // Clear after processing
    }
  }, [validatedWord, isRevealing, isGameOver, handleSubmitValidatedGuess]);

  // Preload celebration music when extreme mode is enabled
  useEffect(() => {
    if (extremeMode) {
      console.log('[EXTREME MODE] Preloading celebration music...');
      celebrationAudio.loadAudioFile(celebrateMusic)
        .then((success) => {
          if (success) {
            console.log('[EXTREME MODE] Celebration music preloaded successfully');
          } else {
            console.log('[EXTREME MODE] Using synthesized fallback music');
          }
        })
        .catch((error) => {
          console.warn('[EXTREME MODE] Failed to preload celebration music:', error);
        });
    }
  }, [extremeMode]);

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
    
    // If we're already checking online, don't start another check
    if (isCheckingOnline) {
      console.log(`[isValidWord] Already checking online, returning false for ${upperCaseWord}`);
      return false;
    }
    
    // Start online check immediately - no local fallback
    console.log(`Starting online check for ${upperCaseWord}...`);
    console.log(`checkWordOnline function type:`, typeof checkWordOnline);
    console.log(`checkWordOnline function:`, checkWordOnline);
    
    // Set checking flag and start asynchronous check
    setIsCheckingOnline(true);
    setMessage('Checking dictionary...');
    setDictionaryStatus({
      type: 'checking',
      message: 'Checking dictionary...',
      word: upperCaseWord
    });
    
    // Single safety timeout to ensure UI never gets stuck
    const safetyTimeoutId = setTimeout(() => {
      console.log(`SAFETY TIMEOUT: Online check taking too long for ${upperCaseWord} - rejecting word`);
      setIsCheckingOnline(false);
      setMessage('Dictionary check timed out');
      
      // Show floating error dialog for timeout
      setFloatingDictionaryError({
        show: true,
        message: 'Dictionary timeout - try again',
        word: upperCaseWord
      });
      
      // Start shake animation
      setShakeInvalid(true);
      
      setDictionaryStatus({
        type: 'timeout',
        message: 'Dictionary check timed out',
        word: upperCaseWord
      });
      animateInvalid(true);
      setTimeout(() => {
        animateInvalid(false);
        setMessage('');
        
        // Stop shake animation
        setShakeInvalid(false);
        
        // Hide floating error dialog after animation
        setTimeout(() => {
          setFloatingDictionaryError({ show: false, message: '', word: '' });
        }, 300);
        
        // Clear dictionary status after a longer delay to give user time to read
        setTimeout(() => {
          setDictionaryStatus({ type: '', message: '', word: '' });
        }, 2000);
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
          console.log(`[isValidWord ASYNC] Word is valid, will call handleSubmitValidatedGuess with: ${upperCaseWord}`);
          setMessage('');
          setDictionaryStatus({
            type: 'valid',
            message: `"${upperCaseWord}" is valid`,
            word: upperCaseWord
          });
          
          // Set the validated word state to trigger submission
          setValidatedWord(upperCaseWord);
          
          // Clear the status after a shorter delay for valid words
          setTimeout(() => {
            setDictionaryStatus({ type: '', message: '', word: '' });
          }, 1500);
          
        } else {
          // Word is invalid online
          console.log(`[isValidWord ASYNC] Word is invalid, showing error message`);
          setMessage('Not in dictionary');
          
          // Show floating error dialog above the current guess
          setFloatingDictionaryError({
            show: true,
            message: `"${upperCaseWord}" not found`,
            word: upperCaseWord
          });
          
          // Start shake animation
          setShakeInvalid(true);
          
          setDictionaryStatus({
            type: 'invalid',
            message: `"${upperCaseWord}" not found in dictionary`,
            word: upperCaseWord
          });
          animateInvalid(true);
          setTimeout(() => {
            animateInvalid(false);
            setMessage('');
            
            // Stop shake animation
            setShakeInvalid(false);
            
            // Hide floating error dialog after animation
            setTimeout(() => {
              setFloatingDictionaryError({ show: false, message: '', word: '' });
            }, 300);
            
            // Keep dictionary status longer for invalid words so user can read it
            setTimeout(() => {
              setDictionaryStatus({ type: '', message: '', word: '' });
            }, 3000);
          }, 1000);
        }
      })
      .catch(error => {
        clearTimeout(safetyTimeoutId);
        console.error('Error in online check:', error);
        setIsCheckingOnline(false);
        setMessage('Dictionary check failed');
        
        // Show floating error dialog for error
        setFloatingDictionaryError({
          show: true,
          message: 'Dictionary error - try again',
          word: upperCaseWord
        });
        
        // Start shake animation
        setShakeInvalid(true);
        
        setDictionaryStatus({
          type: 'error',
          message: 'Dictionary check failed - please try again',
          word: upperCaseWord
        });
        animateInvalid(true);
        setTimeout(() => {
          animateInvalid(false);
          setMessage('');
          
          // Stop shake animation
          setShakeInvalid(false);
          
          // Hide floating error dialog after animation
          setTimeout(() => {
            setFloatingDictionaryError({ show: false, message: '', word: '' });
          }, 300);
          
          // Keep error status longer so user can read it
          setTimeout(() => {
            setDictionaryStatus({ type: '', message: '', word: '' });
          }, 3000);
        }, 1000);
      });
    
    // Return false to indicate async check started - don't proceed with submission yet
    console.log(`[isValidWord] Returning false - async check started for ${upperCaseWord}, wait for completion`);
    return false;
  }, [isCheckingOnline, animateInvalid]);
  
  // Function to check if a guess follows extreme mode rules
  const validateExtremeMode = useCallback((newGuess) => {
    // If there are no previous guesses, no constraints yet
    if (guesses.length === 0) return { valid: true };
    
    // Collect all constraints from all previous guesses
    const requiredLetters = new Set();
    const correctPositions = {};
    const forbiddenLetters = new Set(); // Letters that are completely absent from the target word
    const wrongPositions = {}; // Letters that cannot be in specific positions
    const maxLetterCounts = {}; // Maximum count of each letter that we've confirmed exists
    
    // Process all previous guesses to build constraint sets
    guesses.forEach((guess) => {
      // First, count how many of each letter are marked green or yellow in this guess
      const foundLetterCounts = {}; // Counts of letters with correct/present status
      const absentLetters = new Set(); // Letters marked gray in this guess
      
      guess.forEach((letterObj) => {
        const letter = letterObj.letter;
        
        if (letterObj.status === 'correct' || letterObj.status === 'present') {
          foundLetterCounts[letter] = (foundLetterCounts[letter] || 0) + 1;
        } else if (letterObj.status === 'absent') {
          absentLetters.add(letter);
        }
      });
      
      // Update maxLetterCounts based on what we found in this guess
      Object.keys(foundLetterCounts).forEach(letter => {
        const count = foundLetterCounts[letter];
        maxLetterCounts[letter] = Math.max(maxLetterCounts[letter] || 0, count);
      });
      
      // Now process each letter for position constraints and required letters
      guess.forEach((letterObj, index) => {
        const letter = letterObj.letter;
        
        if (letterObj.status === 'correct') {
          // Letter is in correct position - must be used in same position
          requiredLetters.add(letter);
          correctPositions[index] = letter;
        } else if (letterObj.status === 'present') {
          // Letter is in word but wrong position - must be used but not in this position
          requiredLetters.add(letter);
          if (!wrongPositions[letter]) {
            wrongPositions[letter] = new Set();
          }
          wrongPositions[letter].add(index);
        } else if (letterObj.status === 'absent') {
          // Only mark as forbidden if we haven't found this letter as green/yellow elsewhere
          if (!foundLetterCounts[letter]) {
            forbiddenLetters.add(letter);
          }
        }
      });
    });
    
    // Count letters in the new guess
    const newGuessLetterCounts = {};
    for (let i = 0; i < newGuess.length; i++) {
      const letter = newGuess[i];
      newGuessLetterCounts[letter] = (newGuessLetterCounts[letter] || 0) + 1;
    }
    
    // NEW RULE 1: Check if any letter in the new guess is completely forbidden (gray with no green/yellow)
    for (let i = 0; i < newGuess.length; i++) {
      const letter = newGuess[i];
      if (forbiddenLetters.has(letter)) {
        return {
          valid: false,
          message: `Cannot use letter ${letter} - it's not in the target word`
        };
      }
    }
    
    // NEW RULE 5: Check if new guess uses more of any letter than we've confirmed exists
    for (const [letter, count] of Object.entries(newGuessLetterCounts)) {
      if (maxLetterCounts[letter] !== undefined && count > maxLetterCounts[letter]) {
        return {
          valid: false,
          message: `Can only use ${maxLetterCounts[letter]} '${letter}' (found ${maxLetterCounts[letter]} so far)`
        };
      }
    }
    
    // NEW RULE 2: Check if present letters are placed in known wrong positions
    for (let i = 0; i < newGuess.length; i++) {
      const letter = newGuess[i];
      if (wrongPositions[letter] && wrongPositions[letter].has(i)) {
        return {
          valid: false,
          message: `Letter ${letter} cannot be in position ${i + 1} - already tried there`
        };
      }
    }
    
    // EXISTING RULE 1: Check if all required letters are used
    for (const letter of requiredLetters) {
      if (!newGuess.includes(letter)) {
        return {
          valid: false,
          message: `Must use the letter ${letter} in your guess`
        };
      }
    }
    
    // EXISTING RULE 2: Check if correct positions are maintained
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
    if (guesses.length === 0) return { 
      letters: [], 
      positions: {},
      forbiddenLetters: [],
      wrongPositions: {},
      maxLetterCounts: {}
    };
    
    // Collect all constraints from all previous guesses
    const requiredLetters = [];
    const correctPositions = {};
    const forbiddenLetters = [];
    const wrongPositions = {};
    const maxLetterCounts = {};
    
    // Process all previous guesses to build constraint sets
    guesses.forEach((guess) => {
      // First pass: count letters that are green or yellow in this guess
      const foundLetterCounts = {};
      const absentInGuess = new Set();
      
      guess.forEach((letterObj) => {
        const letter = letterObj.letter;
        
        if (letterObj.status === 'correct' || letterObj.status === 'present') {
          foundLetterCounts[letter] = (foundLetterCounts[letter] || 0) + 1;
        } else if (letterObj.status === 'absent') {
          absentInGuess.add(letter);
        }
      });
      
      // Update maxLetterCounts
      Object.keys(foundLetterCounts).forEach(letter => {
        const count = foundLetterCounts[letter];
        maxLetterCounts[letter] = Math.max(maxLetterCounts[letter] || 0, count);
      });
      
      // Second pass: process position constraints
      guess.forEach((letterObj, index) => {
        const letter = letterObj.letter;
        
        if (letterObj.status === 'correct') {
          if (!requiredLetters.includes(letter)) {
            requiredLetters.push(letter);
          }
          correctPositions[index] = letter;
        } else if (letterObj.status === 'present') {
          if (!requiredLetters.includes(letter)) {
            requiredLetters.push(letter);
          }
          if (!wrongPositions[letter]) {
            wrongPositions[letter] = [];
          }
          if (!wrongPositions[letter].includes(index + 1)) {
            wrongPositions[letter].push(index + 1); // Store as 1-based position for display
          }
        } else if (letterObj.status === 'absent') {
          // Only mark as forbidden if not found as green/yellow
          if (!foundLetterCounts[letter] && !forbiddenLetters.includes(letter)) {
            forbiddenLetters.push(letter);
          }
        }
      });
    });
    
    return { 
      letters: requiredLetters, 
      positions: correctPositions,
      forbiddenLetters: forbiddenLetters,
      wrongPositions: wrongPositions,
      maxLetterCounts: maxLetterCounts
    };
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
    
    // Check if word is in dictionary - this will start async validation
    console.log(`[handleSubmitGuess] Validating word: ${formattedGuess}`);
    console.log(`[handleSubmitGuess] State: always using online dictionary, isCheckingOnline=${isCheckingOnline}`);
    
    const wordIsValid = isValidWord(formattedGuess);
    console.log(`[handleSubmitGuess] isValidWord returned: ${wordIsValid}`);
    
    // isValidWord now returns false when starting async check, so we should not proceed
    if (!wordIsValid) {
      console.log(`[handleSubmitGuess] Word validation failed or async check started - not proceeding with submission`);
      // Either the word was rejected immediately, or async check was started
      // If async check was started, it will call handleSubmitValidatedGuess when complete
      return;
    }
    
    // This should not happen with current logic, but just in case
    console.log(`[handleSubmitGuess] WARNING: Unexpected case - isValidWord returned true`);
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

  // Reset game to play again - Always creates a practice game with random word
  const resetGame = useCallback(() => {
    // Save final stats of current game if it's game over
    if (isGameOver && !localStorage.getItem(`${STORAGE_KEY}_finalized_${targetWord}`)) {
      updateStats(isCorrect, guesses.length);
      // Mark this game as finalized so we don't count it twice
      localStorage.setItem(`${STORAGE_KEY}_finalized_${targetWord}`, 'true');
    }
    
    // Clear any existing practice progress first
    clearPracticeProgress();
    
    // Reset all game state immediately
    setGuess('');
    setGuesses([]);
    setMessage('');
    setIsCorrect(false);
    setIsGameOver(false);
    setUsedKeys({});
    setValidatedWord('');
    setIsRevealing(false);
    setIsCheckingOnline(false);
    setDailyCompleted(false); // Important: Reset daily completion state
    
    // Generate a new random word for practice
    const newTargetWord = getRandomWord();
    setTargetWord(newTargetWord);
    
    // Switch to practice mode (this will trigger useEffect cleanup)
    setGameMode('practice');
    
    // Save the new practice game state (preserving extreme mode setting)
    savePracticeProgress(newTargetWord, [], {}, false, false, extremeMode);
    
    // Announce to screen readers
    const announcement = document.createElement('div');
    announcement.className = 'sr-only';
    announcement.setAttribute('aria-live', 'assertive');
    announcement.textContent = 'New practice game started';
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);

  }, [isGameOver, targetWord, isCorrect, guesses.length, updateStats, extremeMode]);

  // Game mode switching functions
  const startDailyMode = useCallback(() => {
    setGameMode('daily');
    
    // Get current daily progress for today's word
    const currentProgress = getCurrentDailyProgress(dayString, dailyWord);
    
    if (currentProgress) {
      // Progress exists for today's word - load it
      setTargetWord(currentProgress.word);
      setGuesses(currentProgress.guesses);
      setUsedKeys(currentProgress.usedKeys);
      setIsGameOver(currentProgress.isGameOver);
      setIsCorrect(currentProgress.isWinner);
      setDailyCompleted(currentProgress.isGameOver);
      
      // Restore extreme mode setting if it exists
      if (currentProgress.extremeMode !== undefined) {
        setExtremeMode(currentProgress.extremeMode);
      }
      
      if (currentProgress.isGameOver) {
        // Show completion message for finished daily game
        setMessage(currentProgress.isWinner 
          ? `Daily word completed! You got it in ${currentProgress.guesses.length} guesses.` 
          : `Daily word completed. The word was ${currentProgress.word}.`);
      } else {
        // Clear message for in-progress daily game
        setMessage('Continue your daily word...');
      }
    } else {
      // No progress for today's word - start fresh daily game
      setTargetWord(dailyWord);
      setGuess('');
      setGuesses([]);
      setMessage('Starting today\'s daily word...');
      setIsCorrect(false);
      setIsGameOver(false);
      setUsedKeys({});
      setValidatedWord('');
      setDailyCompleted(false);
    }
  }, [dayString, dailyWord]);

  const startPracticeMode = useCallback(() => {
    setGameMode('practice');
    
    // Check if there's a practice game in progress
    const practiceProgress = loadPracticeProgress();
    if (practiceProgress && !practiceProgress.isGameOver) {
      // Resume existing practice game
      setTargetWord(practiceProgress.word);
      setGuesses(practiceProgress.guesses);
      setUsedKeys(practiceProgress.usedKeys);
      setIsGameOver(practiceProgress.isGameOver);
      setIsCorrect(practiceProgress.isWinner);
      
      // Restore extreme mode setting if it exists
      if (practiceProgress && practiceProgress.extremeMode !== undefined) {
        setExtremeMode(practiceProgress.extremeMode);
      }
      
      setMessage('');
    } else {
      // Start a new practice game
      const newTargetWord = getRandomWord();
      setTargetWord(newTargetWord);
      setGuess('');
      setGuesses([]);
      setMessage('');
      setIsCorrect(false);
      setIsGameOver(false);
      setUsedKeys({});
      setValidatedWord('');
      
      // Save the new practice game state
      savePracticeProgress(newTargetWord, [], {}, false, false, extremeMode);
    }
  }, [extremeMode]);

  const showDailyStatsModal = useCallback(() => {
    setShowDailyStats(true);
  }, []);

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
        <div>{VERSION_CONFIG.getDisplayVersion()}</div>
      </div>

      {/* Game Mode Selection */}
      <div className="game-mode-selector">
        <button 
          className={`mode-button ${gameMode === 'daily' ? 'active' : ''}`}
          onClick={startDailyMode}
        >
          Daily Word #{dayNumber}
        </button>
        {gameMode === 'daily' && (
          <button className="stats-button" onClick={showDailyStatsModal}>
            📊 Stats
          </button>
        )}
      </div>

      {/* Daily Word Header */}
      {gameMode === 'daily' && (
        <div className="daily-header">
          <div className="daily-info">
            Daily Word #{dayNumber} - {dayString}
          </div>
          {dailyCompleted && (
            <div className="daily-completed">
              ✅ Completed!
            </div>
          )}
        </div>
      )}
      
      {/* Game Mode Toggle */}
      <div className="game-mode-toggle">
        <button 
          className={`mode-toggle-button ${extremeMode ? 'extreme' : 'normal'}`}
          onClick={() => {
            console.log(`[DEBUG] Extreme mode toggle clicked. Current: ${extremeMode}, setting to: ${!extremeMode}`);
            setExtremeMode(!extremeMode);
          }}
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
              <li>Cannot reuse letters marked as absent (gray)</li>
              <li>Cannot place letters in known wrong positions</li>
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
                <div className="forbidden-letters">
                  <strong>Forbidden Letters:</strong>{' '}
                  {getRequiredLettersForExtreme().forbiddenLetters.length > 0 
                    ? getRequiredLettersForExtreme().forbiddenLetters.map((letter, index) => (
                        <AbsentLetter key={index} letter={letter} />
                      ))
                    : 'None yet'
                  }
                </div>
                <div className="wrong-positions">
                  <strong>Wrong Positions:</strong>{' '}
                  {Object.entries(getRequiredLettersForExtreme().wrongPositions).length > 0 
                    ? Object.entries(getRequiredLettersForExtreme().wrongPositions)
                        .map(([letter, positions]) => (
                          <WrongPositionLetter 
                            key={letter} 
                            letter={letter} 
                            positions={positions} 
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
              aria-label="Start a new practice game"
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
            key={`completed-guess-${guessIndex}`} 
            className="guess-row"
            role="row"
            aria-label={`Guess ${guessIndex + 1}`}
          >
            {Array.isArray(guess) 
              ? guess.map((letter, letterIndex) => (
                <Tile
                  key={`guess-${guessIndex}-letter-${letterIndex}`}
                  letter={letter.letter}
                  status={letter.status}
                  index={letterIndex}
                  isRevealing={guessIndex === guesses.length - 1 && isRevealing}
                />
              ))
              : guess.split('').map((letter, letterIndex) => (
                <Tile
                  key={`guess-${guessIndex}-letter-${letterIndex}`}
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
            className={`guess-row ${floatingDictionaryError.show ? 'has-floating-error' : ''} ${shakeInvalid ? 'shake-invalid' : ''}`}
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
            {/* Floating Dictionary Error Dialog */}
            {floatingDictionaryError.show && (
              <div className="floating-dictionary-error">
                {floatingDictionaryError.message}
              </div>
            )}
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

      {/* Daily Stats Modal */}
      {showDailyStats && (
        <DailyStatsModal onClose={() => setShowDailyStats(false)} />
      )}

      {/* Extreme Win Celebration */}
      <ExtremeWinCelebration
        isVisible={showExtremeCelebration}
        onComplete={() => setShowExtremeCelebration(false)}
      />
      
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
