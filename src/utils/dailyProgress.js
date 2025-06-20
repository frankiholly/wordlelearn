// Daily progress storage and management
export function saveDailyProgress(dayString, gameState) {
  const progressKey = `wordle-daily-${dayString}`;
  const progressData = {
    dayString,
    word: gameState.targetWord,
    guesses: gameState.guesses,
    isGameOver: gameState.isGameOver,
    isWinner: gameState.isWinner,
    completedAt: gameState.isGameOver ? new Date().toISOString() : null,
    usedKeys: gameState.usedKeys
  };
  
  try {
    localStorage.setItem(progressKey, JSON.stringify(progressData));
    console.log(`Daily progress saved for ${dayString}`);
  } catch (error) {
    console.error('Failed to save daily progress:', error);
  }
}

export function loadDailyProgress(dayString) {
  const progressKey = `wordle-daily-${dayString}`;
  
  try {
    const saved = localStorage.getItem(progressKey);
    if (saved) {
      const progressData = JSON.parse(saved);
      console.log(`Daily progress loaded for ${dayString}`);
      return progressData;
    }
  } catch (error) {
    console.error('Failed to load daily progress:', error);
  }
  
  return null;
}

export function isDailyWordCompleted(dayString, expectedWord) {
  const progress = loadDailyProgress(dayString);
  // Check that progress exists, game is over, AND the stored word matches the expected word
  return progress && progress.isGameOver && progress.word === expectedWord;
}

export function getCurrentDailyProgress(dayString, expectedWord) {
  const progress = loadDailyProgress(dayString);
  
  // If no progress exists, return null (new day)
  if (!progress) {
    return null;
  }
  
  // If progress exists but for a different word, return null (new word available)
  if (progress.word !== expectedWord) {
    return null;
  }
  
  // Return the progress for the current word
  return progress;
}

export function shouldStartNewDaily(dayString, expectedWord) {
  const progress = loadDailyProgress(dayString);
  
  // If no progress exists, start new
  if (!progress) {
    return true;
  }
  
  // If progress is for a different word, start new
  if (progress.word !== expectedWord) {
    return true;
  }
  
  // If progress exists for same word and game is over, don't start new
  if (progress.isGameOver) {
    return false;
  }
  
  // If progress exists for same word but game not over, continue existing
  return false;
}

export function clearDailyProgress(dayString) {
  const progressKey = `wordle-daily-${dayString}`;
  try {
    localStorage.removeItem(progressKey);
    console.log(`Daily progress cleared for ${dayString}`);
  } catch (error) {
    console.error('Failed to clear daily progress:', error);
  }
}

export function getDailyStats() {
  const stats = {
    totalDaysPlayed: 0,
    totalWins: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
  };
  
  try {
    // Get all daily progress from localStorage
    const keys = Object.keys(localStorage).filter(key => key.startsWith('wordle-daily-'));
    const progressEntries = keys.map(key => {
      try {
        return JSON.parse(localStorage.getItem(key));
      } catch {
        return null;
      }
    }).filter(Boolean);
    
    // Sort by date
    progressEntries.sort((a, b) => new Date(a.dayString) - new Date(b.dayString));
    
    stats.totalDaysPlayed = progressEntries.length;
    
    let currentStreak = 0;
    let maxStreak = 0;
    let lastDate = null;
    
    progressEntries.forEach(entry => {
      if (entry.isGameOver) {
        if (entry.isWinner) {
          stats.totalWins++;
          
          // Calculate guess distribution
          const guessCount = entry.guesses.length;
          if (guessCount >= 1 && guessCount <= 6) {
            stats.guessDistribution[guessCount]++;
          }
          
          // Calculate streak
          const entryDate = new Date(entry.dayString);
          if (!lastDate || (entryDate - lastDate) === 86400000) { // 1 day in ms
            currentStreak++;
          } else {
            currentStreak = 1;
          }
          maxStreak = Math.max(maxStreak, currentStreak);
          lastDate = entryDate;
        } else {
          currentStreak = 0;
        }
      }
    });
    
    // Check if current streak is still valid (played yesterday or today)
    const today = new Date();
    const yesterday = new Date(today - 86400000);
    if (lastDate && (lastDate < yesterday)) {
      currentStreak = 0;
    }
    
    stats.currentStreak = currentStreak;
    stats.maxStreak = maxStreak;
    
  } catch (error) {
    console.error('Failed to calculate daily stats:', error);
  }
  
  return stats;
}
