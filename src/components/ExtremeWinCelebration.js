import React, { useEffect, useState } from 'react';
import { celebrationAudio } from '../utils/celebrationAudio';
import { CelebrationSettings } from '../utils/celebrationSettings';
import './ExtremeWinCelebration.css';

const ExtremeWinCelebration = ({ isVisible, onComplete }) => {
  const [animationPhase, setAnimationPhase] = useState('enter');
  const [settings, setSettings] = useState(CelebrationSettings.load());
  const [catExpression, setCatExpression] = useState('happy');

  useEffect(() => {
    if (!isVisible) return;

    // Load user preferences
    const currentSettings = CelebrationSettings.load();
    setSettings(currentSettings);
    
    // Handle key press to stop animation
    const handleKeyPress = (event) => {
      celebrationAudio.stop();
      onComplete();
    };

    // Add global key listener
    document.addEventListener('keydown', handleKeyPress);
    
    let totalMusicDuration = 8; // Default extended duration
    
    // Play soothing melody if audio is enabled
    if (currentSettings.audioEnabled) {
      celebrationAudio.setVolume(currentSettings.volume);
      celebrationAudio.playExtremeCelebrationMelody().then(duration => {
        if (duration) totalMusicDuration = duration;
      }).catch(error => {
        console.warn('Audio playback failed:', error);
      });
    }

    // Extended phases for longer celebration
    const phases = [
      { phase: 'enter', duration: 800 },
      { phase: 'celebrate', duration: Math.max(6000, totalMusicDuration * 1000 - 2000) }, // Match music duration
      { phase: 'exit', duration: 1200 }
    ];

    // Cat expression timeline
    const expressionTimeline = [
      { time: 1000, expression: 'happy' },
      { time: 3000, expression: 'content' },
      { time: 5000, expression: 'sleepy' },
      { time: 7000, expression: 'peaceful' }
    ];

    let currentPhaseIndex = 0;
    const runPhase = () => {
      if (currentPhaseIndex < phases.length) {
        const { phase, duration } = phases[currentPhaseIndex];
        setAnimationPhase(phase);
        
        setTimeout(() => {
          currentPhaseIndex++;
          if (currentPhaseIndex < phases.length) {
            runPhase();
          } else {
            document.removeEventListener('keydown', handleKeyPress);
            onComplete();
          }
        }, duration);
      }
    };

    // Schedule cat expression changes
    expressionTimeline.forEach(({ time, expression }) => {
      setTimeout(() => setCatExpression(expression), time);
    });

    runPhase();

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isVisible, onComplete]);

  if (!isVisible || !settings.visualEnabled) return null;

  // Generate floating particles
  const particles = Array.from({ length: 12 }, (_, i) => (
    <div 
      key={i} 
      className={`particle particle-${i + 1}`}
      style={{
        left: `${Math.random() * 80 + 10}%`,
        animationDelay: `${Math.random() * 2}s`
      }}
    >
      {Math.random() > 0.5 ? '✨' : '💫'}
    </div>
  ));

  return (
    <div className={`extreme-celebration ${animationPhase}`}>
      <div className="celebration-backdrop" />
      
      {/* Main character */}
      <div className="celebration-character">
        <div className="kitten-container">
          {/* Enhanced animated kitten SVG */}
          <svg viewBox="0 0 100 100" className="kitten-svg">
            {/* Kitten body */}
            <ellipse cx="50" cy="70" rx="25" ry="20" fill="#FFE4B5" />
            
            {/* Kitten head */}
            <circle cx="50" cy="35" r="20" fill="#FFE4B5" />
            
            {/* Ears */}
            <path d="M35 25 L40 15 L45 25 Z" fill="#FFE4B5" />
            <path d="M55 25 L60 15 L65 25 Z" fill="#FFE4B5" />
            <path d="M37 23 L40 18 L43 23 Z" fill="#FFB6C1" />
            <path d="M57 23 L60 18 L63 23 Z" fill="#FFB6C1" />
            
            {/* Animated eyes based on expression */}
            <g className={`cat-eyes expression-${catExpression}`}>
              {catExpression === 'sleepy' || catExpression === 'peaceful' ? (
                // Closed/sleepy eyes
                <>
                  <path d="M40 32 Q43 30 46 32" stroke="#000" strokeWidth="2" fill="none" className="sleepy-eye" />
                  <path d="M54 32 Q57 30 60 32" stroke="#000" strokeWidth="2" fill="none" className="sleepy-eye" />
                </>
              ) : (
                // Open eyes with blinking
                <>
                  <circle cx="43" cy="32" r="3" fill="#000" className="cat-eye-left" />
                  <circle cx="57" cy="32" r="3" fill="#000" className="cat-eye-right" />
                  <circle cx="44" cy="31" r="1" fill="#FFF" className="eye-shine-left" />
                  <circle cx="58" cy="31" r="1" fill="#FFF" className="eye-shine-right" />
                </>
              )}
            </g>
            
            {/* Nose */}
            <path d="M48 38 L50 35 L52 38 Z" fill="#FFB6C1" />
            
            {/* Animated mouth based on expression */}
            <g className={`cat-mouth expression-${catExpression}`}>
              {catExpression === 'happy' && (
                <>
                  <path d="M50 38 Q45 42 40 40" stroke="#000" strokeWidth="1" fill="none" />
                  <path d="M50 38 Q55 42 60 40" stroke="#000" strokeWidth="1" fill="none" />
                </>
              )}
              {catExpression === 'content' && (
                <>
                  <path d="M50 38 Q47 40 44 39" stroke="#000" strokeWidth="1" fill="none" />
                  <path d="M50 38 Q53 40 56 39" stroke="#000" strokeWidth="1" fill="none" />
                </>
              )}
              {(catExpression === 'sleepy' || catExpression === 'peaceful') && (
                <ellipse cx="50" cy="40" rx="2" ry="1" fill="#FFB6C1" />
              )}
            </g>
            
            {/* Animated whiskers */}
            <g className="cat-whiskers">
              <line x1="30" y1="35" x2="40" y2="37" stroke="#000" strokeWidth="1" className="whisker-left-1" />
              <line x1="30" y1="40" x2="40" y2="40" stroke="#000" strokeWidth="1" className="whisker-left-2" />
              <line x1="60" y1="37" x2="70" y2="35" stroke="#000" strokeWidth="1" className="whisker-right-1" />
              <line x1="60" y1="40" x2="70" y2="40" stroke="#000" strokeWidth="1" className="whisker-right-2" />
            </g>
            
            {/* Paws */}
            <circle cx="38" cy="85" r="4" fill="#FFE4B5" />
            <circle cx="62" cy="85" r="4" fill="#FFE4B5" />
            
            {/* Animated tail */}
            <path 
              d="M25 75 Q15 60 20 45" 
              stroke="#FFE4B5" 
              strokeWidth="8" 
              fill="none" 
              className="cat-tail"
            />
          </svg>
        </div>
      </div>

      {/* Floating particles */}
      <div className="particles-container">
        {particles}
      </div>

      {/* Celebration text */}
      <div className="celebration-text">
        <h2 className="celebration-title">Extreme Champion!</h2>
        <p className="celebration-subtitle">Masterful performance! 🎉</p>
        <p className="skip-hint">Press any key to continue</p>
      </div>

      {/* Soft color waves */}
      <div className="color-waves">
        <div className="wave wave-1" />
        <div className="wave wave-2" />
        <div className="wave wave-3" />
      </div>
    </div>
  );
};

export default ExtremeWinCelebration;
