import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { getRandomWord } from './wordList';
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
const Tile = ({ letter, status, index, isRevealing }) => {
  const animationDelay = index * 0.2;
  const revealClass = isRevealing && status ? 'flip-in' : '';

  return (
    <div 
      className={`letter-tile ${status || ''} ${revealClass}`} 
      style={{ animationDelay: `${animationDelay}s` }}
      aria-label={status ? `${letter} is ${status}` : ''}
    >
      {letter}
    </div>
  );
};

// Create keyboard key component with animation
const KeyboardKey = ({ letter, status, onClick, isPressed }) => {
  return (
    <div 
      className={`keyboard-key ${status || ''} ${isPressed ? 'pressed' : ''}`}
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
      {letter}
    </div>
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
  
  // Refs for focus management
  const inputRef = useRef(null);
  
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

  // Helper to determine priority of statuses for keyboard
  // correct > present > absent
  const getStatusPriority = useCallback((status) => {
    switch (status) {
      case 'correct': return 3;
      case 'present': return 2;
      case 'absent': return 1;
      default: return 0;
    }
  }, []);

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
          inProgress: true
        }
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameData));
    }
  }, [targetWord, guesses, isCorrect, isGameOver, usedKeys, stats]);

  // Use effect to check for game over conditions
  useEffect(() => {
    // Game is over if player guessed correctly or used all attempts
    if (isCorrect || guesses.length >= MAX_ATTEMPTS) {
      setIsGameOver(true);
    }
  }, [isCorrect, guesses.length]);

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

  // Focus input when the game starts or resets
  useEffect(() => {
    if (!isGameOver && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isGameOver]);

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
        inProgress: true
      }
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameData));
    
    // Focus on the input field
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isGameOver, targetWord, isCorrect, guesses.length, updateStats, stats]);

  // Handle on-screen keyboard clicks
  const handleKeyClick = useCallback((key) => {
    if (isGameOver || isRevealing) return;
    
    if (guess.length < 5) {
      setGuess(prev => prev + key);
    }
    
    // Focus back on input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [guess, isGameOver, isRevealing]);

  // Handle guess submission - extracted for reuse
  const handleSubmitGuess = useCallback(() => {
    if (isRevealing || isGameOver) return;
    
    // Convert guess to uppercase for comparison
    const formattedGuess = guess.toUpperCase();
    
    // Basic validation for 5-letter words
    if (formattedGuess.length !== 5) {
      setMessage('Please enter a 5-letter word');
      return;
    }
    
    // Evaluate the guess
    const evaluatedGuess = evaluateGuess(formattedGuess);
    
    // Start the revealing animation
    setIsRevealing(true);
    
    // Delay adding the guess to state until animation completes
    setTimeout(() => {
      const newGuesses = [...guesses, evaluatedGuess];
      setGuesses(newGuesses);
      
      // Update keyboard key statuses
      const newUsedKeys = { ...usedKeys };
      evaluatedGuess.forEach(({ letter, status }) => {
        // Only update key status if the new status is higher priority
        const currentStatus = newUsedKeys[letter];
        if (!currentStatus || getStatusPriority(status) > getStatusPriority(currentStatus)) {
          newUsedKeys[letter] = status;
        }
      });
      setUsedKeys(newUsedKeys);
      
      // Check if the guess is correct
      const isGuessCorrect = formattedGuess === targetWord;
      if (isGuessCorrect) {
        setMessage('Correct! You guessed the word!');
        setIsCorrect(true);
        // Update stats for win
        localStorage.setItem(`${STORAGE_KEY}_finalized_${targetWord}`, 'true');
        updateStats(true, newGuesses.length);
        
        // Announce result to screen readers
        const announcement = document.createElement('div');
        announcement.className = 'sr-only';
        announcement.setAttribute('aria-live', 'assertive');
        announcement.textContent = 'Correct! You won the game!';
        document.body.appendChild(announcement);
        setTimeout(() => document.body.removeChild(announcement), 1000);
      } else if (newGuesses.length >= MAX_ATTEMPTS) {
        setMessage(`Game over! The word was ${targetWord}.`);
        setIsGameOver(true);
        // Update stats for loss
        localStorage.setItem(`${STORAGE_KEY}_finalized_${targetWord}`, 'true');
        updateStats(false, MAX_ATTEMPTS);
        
        // Announce result to screen readers
        const announcement = document.createElement('div');
        announcement.className = 'sr-only';
        announcement.setAttribute('aria-live', 'assertive');
        announcement.textContent = `Game over! The word was ${targetWord}.`;
        document.body.appendChild(announcement);
        setTimeout(() => document.body.removeChild(announcement), 1000);
      } else {
        setMessage(`Not quite. Try again! ${MAX_ATTEMPTS - newGuesses.length} attempts left.`);
      }
      
      // Clear the input field
      setGuess('');
      setIsRevealing(false);
    }, 1500); // Time for animation to complete
  }, [evaluateGuess, guess, guesses, isGameOver, isRevealing, targetWord, usedKeys, getStatusPriority, updateStats]);

  const handleGuess = useCallback((e) => {
    e.preventDefault();
    handleSubmitGuess();
  }, [handleSubmitGuess]);

  // Memoize keyboard rows to prevent unnecessary re-renders
  const keyboardRows = useMemo(() => [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ], []);

  return (
    <div className="App">
      <h1 className="title">Wordle</h1>
      
      {/* Accessibility skiplink */}
      <a href="#game-controls" className="sr-only">Skip to game controls</a>
      
      <div id="game-controls">
        <form onSubmit={handleGuess} aria-label="Word input form">
          <label htmlFor="guess-input" className="sr-only">Enter a 5-letter word</label>
          <input
            id="guess-input"
            ref={inputRef}
            type="text" 
            className="guess-input"
            value={guess}
            onChange={(e) => setGuess(e.target.value.toUpperCase())}
            placeholder="Enter a 5-letter word"
            maxLength={5}
            disabled={isGameOver || isRevealing}
            readOnly={true}
            autoFocus
            aria-label={`Enter a 5-letter word. ${guesses.length} of ${MAX_ATTEMPTS} attempts used.`}
          />
          <button 
            type="submit" 
            disabled={isGameOver || guess.length !== 5 || isRevealing}
            aria-label="Submit guess"
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
        </form>
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
        <span className="target-word">
          {isGameOver ? `Word: ${targetWord}` : ''}
        </span>
      </div>
      
      {/* Display previous guesses and empty rows for remaining attempts */}
      <div 
        className="guesses-container"
        role="grid"
        aria-label="Wordle guesses grid"
      >
        {/* Render completed guess rows */}
        {guesses.map((guess, guessIndex) => (
          <div 
            key={guessIndex} 
            className="guess-row"
            role="row"
            aria-label={`Guess ${guessIndex + 1}`}
          >
            {guess.map((letter, letterIndex) => (
              <Tile
                key={letterIndex}
                letter={letter.letter}
                status={letter.status}
                index={letterIndex}
                isRevealing={guessIndex === guesses.length - 1 && isRevealing}
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
            {row.map((key) => (
              <KeyboardKey
                key={`key-${key}`}
                letter={key}
                status={usedKeys[key] || ''}
                onClick={handleKeyClick}
                isPressed={pressedKey === key}
              />
            ))}
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
