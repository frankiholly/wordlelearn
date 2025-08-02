// Practice game progress storage and management
export function savePracticeProgress(word, guesses, usedKeys, isGameOver, isWinner, extremeMode = false) {
  const progressKey = 'wordle-practice-current';
  const progressData = {
    word,
    guesses,
    isGameOver,
    isWinner,
    startedAt: new Date().toISOString(),
    completedAt: isGameOver ? new Date().toISOString() : null,
    usedKeys,
    extremeMode // Add extreme mode to saved data
  };
  
  try {
    localStorage.setItem(progressKey, JSON.stringify(progressData));
    console.log('Practice progress saved with extremeMode:', extremeMode);
  } catch (error) {
    console.error('Failed to save practice progress:', error);
  }
}

export function loadPracticeProgress() {
  const progressKey = 'wordle-practice-current';
  
  try {
    const saved = localStorage.getItem(progressKey);
    if (saved) {
      const progressData = JSON.parse(saved);
      console.log('Practice progress loaded');
      return progressData;
    }
  } catch (error) {
    console.error('Failed to load practice progress:', error);
  }
  
  return null;
}

export function isPracticeGameInProgress() {
  const progress = loadPracticeProgress();
  return progress && !progress.isGameOver;
}

export function isPracticeGameCompleted() {
  const progress = loadPracticeProgress();
  return progress && progress.isGameOver;
}

export function clearPracticeProgress() {
  const progressKey = 'wordle-practice-current';
  try {
    localStorage.removeItem(progressKey);
    console.log('Practice progress cleared');
  } catch (error) {
    console.error('Failed to clear practice progress:', error);
  }
}

export function canStartNewPracticeGame() {
  const progress = loadPracticeProgress();
  // Can start new game if no progress exists or current game is completed
  return !progress || progress.isGameOver;
}
