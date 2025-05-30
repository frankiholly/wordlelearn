import React, { useState } from 'react';
import './App.css';

function App() {
  // Stage 1: MVP - Hard-coded target word and basic guess functionality
  const targetWord = "REACT";
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const handleGuess = (e) => {
    e.preventDefault();
    
    // Convert guess to uppercase for comparison
    const formattedGuess = guess.toUpperCase();
    
    // Basic validation for 5-letter words
    if (formattedGuess.length !== 5) {
      setMessage('Please enter a 5-letter word');
      return;
    }
    
    // Check if the guess is correct
    if (formattedGuess === targetWord) {
      setMessage('Correct! You guessed the word!');
      setIsCorrect(true);
    } else {
      setMessage(`Incorrect. Try again!`);
    }
    
    // Clear the input field
    setGuess('');
  };

  return (
    <div className="App">
      <h1 className="title">Wordle</h1>
      
      <form onSubmit={handleGuess}>
        <input
          type="text"
          className="guess-input"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Enter a 5-letter word"
          maxLength={5}
          disabled={isCorrect}
        />
        <button type="submit" disabled={isCorrect}>
          Guess
        </button>
      </form>
      
      {message && (
        <div className={`message ${isCorrect ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
      
      {/* Learning Tips for Stage 1 */}
      <div className="learning-section">
        <h2>Stage 1 Learning:</h2>
        <ul>
          <li>React components and structure</li>
          <li>useState hook for managing state</li>
          <li>Event handling with forms</li>
          <li>Conditional rendering</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
