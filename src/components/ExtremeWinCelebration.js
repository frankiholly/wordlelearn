import React, { useEffect, useState } from 'react';
import { celebrationAudio } from '../utils/celebrationAudio';
import { CelebrationSettings } from '../utils/celebrationSettings';
import './ExtremeWinCelebration.css';

// Import the custom celebration music
import celebrateMusic from '../assets/audio/celebrate.mp3';

const ExtremeWinCelebration = ({ isVisible, onComplete }) => {
  const [animationPhase, setAnimationPhase] = useState('enter');
  const [settings, setSettings] = useState(CelebrationSettings.load());
  const [catExpression, setCatExpression] = useState('happy');

  useEffect(() => {
    if (!isVisible) return;

    console.log('[Celebration] Starting extreme celebration');

    // Load user preferences
    const currentSettings = CelebrationSettings.load();
    setSettings(currentSettings);

    // Load custom audio file on first use
    const loadCustomAudio = async () => {
      try {
        console.log('[Celebration] Loading custom audio...');
        await celebrationAudio.loadAudioFile(celebrateMusic);
        console.log('[Celebration] Custom audio loaded successfully');
      } catch (error) {
        console.warn('[Celebration] Failed to load custom music, will use synthesized fallback');
      }
    };

    // Handle user interaction to stop animation
    const handleStop = () => {
      console.log('[Celebration] User requested stop');
      celebrationAudio.stop();
      onComplete();
    };

    // Load audio and then play celebration music
    const initializeAudio = async () => {
      await loadCustomAudio();
      
      let actualMusicDuration = 8; // Default fallback duration
      
      // Play celebration music (custom file or synthesized fallback) if audio is enabled
      if (currentSettings.audioEnabled) {
        console.log('[Celebration] Audio enabled, starting playback...');
        celebrationAudio.setVolume(currentSettings.volume);
        try {
          const duration = await celebrationAudio.playCelebrationMusic();
          if (duration) {
            actualMusicDuration = duration;
            console.log(`[Celebration] Music duration: ${duration.toFixed(2)}s`);
          }
        } catch (error) {
          console.warn('Audio playback failed:', error);
        }
      } else {
        console.log('[Celebration] Audio disabled in settings');
      }

      // Now set up animation phases based on actual music duration
      const phases = [
        { phase: 'enter', duration: 800 },
        { phase: 'celebrate', duration: Math.max(6000, actualMusicDuration * 1000 - 2000) }, // Match music duration
        { phase: 'exit', duration: 1200 }
      ];

      // Cat expression timeline based on music duration
      const expressionTimeline = [
        { time: 1000, expression: 'happy' },
        { time: Math.min(3000, actualMusicDuration * 1000 * 0.3), expression: 'content' },
        { time: Math.min(5000, actualMusicDuration * 1000 * 0.6), expression: 'sleepy' },
        { time: Math.min(7000, actualMusicDuration * 1000 * 0.8), expression: 'peaceful' }
      ];

      let currentPhaseIndex = 0;
      const runPhase = () => {
        if (currentPhaseIndex < phases.length) {
          const { phase, duration } = phases[currentPhaseIndex];
          setAnimationPhase(phase);
          console.log(`[Celebration] Phase: ${phase}, Duration: ${duration}ms`);
          
          setTimeout(() => {
            currentPhaseIndex++;
            runPhase();
          }, duration);
        } else {
          // Animation completed, finish celebration
          console.log('[Celebration] Animation sequence completed');
          handleStop();
        }
      };

      // Start the animation sequence
      runPhase();

      // Set up expression changes
      expressionTimeline.forEach(({ time, expression }) => {
        setTimeout(() => {
          if (currentPhaseIndex < phases.length) { // Only change if still celebrating
            setCatExpression(expression);
            console.log(`[Celebration] Cat expression: ${expression}`);
          }
        }, time);
      });
    };

    initializeAudio();
    
    // Add global event listeners for both keyboard and mouse
    const handleKeyPress = (event) => {
      console.log('[Celebration] Key pressed:', event.key);
      handleStop();
    };

    const handleMouseClick = (event) => {
      console.log('[Celebration] Mouse clicked');
      handleStop();
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleMouseClick);

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', handleMouseClick);
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
          {/* Enhanced animated cosmic galaxy kitten SVG */}
          <svg viewBox="0 0 100 100" className="kitten-svg">
            {/* Galaxy body */}
            <ellipse cx="50" cy="73" rx="25" ry="19" fill="#191970" />
            <ellipse cx="52" cy="71" rx="20" ry="15" fill="#4B0082" opacity="0.8" />
            <ellipse cx="48" cy="75" rx="15" ry="12" fill="#9400D3" opacity="0.6" />
            
            {/* Galaxy head */}
            <circle cx="50" cy="35" r="21" fill="#191970" />
            <circle cx="52" cy="33" r="18" fill="#4B0082" opacity="0.8" />
            <circle cx="48" cy="37" r="15" ry="12" fill="#9400D3" opacity="0.6" />
            
            {/* Starry ears */}
            <path d="M35 20 L38 8 L45 22 Z" fill="#191970" />
            <path d="M55 22 L62 8 L65 20 Z" fill="#191970" />
            <path d="M37 18 L38 12 L42 19 Z" fill="#4B0082" />
            <path d="M58 19 L62 12 L63 18 Z" fill="#4B0082" />
            
            {/* Animated cosmic eyes based on expression */}
            <g className={`cat-eyes expression-${catExpression}`}>
              {catExpression === 'sleepy' || catExpression === 'peaceful' ? (
                // Closed/sleepy eyes
                <>
                  <path d="M40 32 Q43 30 46 32" stroke="#00FFFF" strokeWidth="2" fill="none" className="sleepy-eye" />
                  <path d="M54 32 Q57 30 60 32" stroke="#00FFFF" strokeWidth="2" fill="none" className="sleepy-eye" />
                </>
              ) : (
                // Large cosmic eyes with blinking
                <>
                  <circle cx="42" cy="32" r="6" fill="#00FFFF" className="cat-eye-left" />
                  <circle cx="58" cy="32" r="6" fill="#00FFFF" className="cat-eye-right" />
                  {/* Starlight in eyes */}
                  <circle cx="44" cy="29" r="2" fill="#FFF" className="eye-shine-left" />
                  <circle cx="60" cy="29" r="2" fill="#FFF" className="eye-shine-right" />
                  <circle cx="40" cy="35" r="1" fill="#FFD700" opacity="0.9" />
                  <circle cx="56" cy="35" r="1" fill="#FFD700" opacity="0.9" />
                </>
              )}
            </g>
            
            {/* Nose */}
            <circle cx="50" cy="41" r="1.5" fill="#FF69B4" />
            
            {/* Animated mouth based on expression */}
            <g className={`cat-mouth expression-${catExpression}`}>
              {catExpression === 'happy' && (
                <>
                  <path d="M47 45 Q50 47 53 45" stroke="#FFF" strokeWidth="1" fill="none" />
                </>
              )}
              {catExpression === 'content' && (
                <>
                  <path d="M47 45 Q50 47 53 45" stroke="#FFF" strokeWidth="1" fill="none" />
                </>
              )}
              {(catExpression === 'sleepy' || catExpression === 'peaceful') && (
                <ellipse cx="50" cy="46" rx="2" ry="1" fill="#FF69B4" />
              )}
            </g>
            
            {/* Cosmic whiskers */}
            <g className="cat-whiskers">
              <line x1="28" y1="36" x2="38" y2="37" stroke="#00FFFF" strokeWidth="1" className="whisker-left-1" />
              <line x1="28" y1="40" x2="38" y2="40" stroke="#00FFFF" strokeWidth="1" className="whisker-left-2" />
              <line x1="62" y1="37" x2="72" y2="36" stroke="#00FFFF" strokeWidth="1" className="whisker-right-1" />
              <line x1="62" y1="40" x2="72" y2="40" stroke="#00FFFF" strokeWidth="1" className="whisker-right-2" />
            </g>
            
            {/* Cosmic paws */}
            <circle cx="41" cy="87" r="4" fill="#191970" />
            <circle cx="59" cy="87" r="4" fill="#191970" />
            
            {/* Galaxy tail */}
            <path 
              d="M25 75 Q12 50 20 25" 
              stroke="#191970" 
              strokeWidth="10" 
              fill="none" 
              className="cat-tail"
            />
            <path 
              d="M27 73 Q14 52 22 30" 
              stroke="#4B0082" 
              strokeWidth="6" 
              fill="none" 
              className="cat-tail"
            />
            <path 
              d="M29 71 Q16 54 24 35" 
              stroke="#9400D3" 
              strokeWidth="3" 
              fill="none" 
              className="cat-tail"
            />
            
            {/* Stars scattered on body */}
            <circle cx="35" cy="65" r="0.5" fill="#FFF" className="star-1">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="65" cy="70" r="0.5" fill="#FFD700" className="star-2">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="55" cy="78" r="0.5" fill="#00FFFF" className="star-3">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="30" cy="30" r="0.5" fill="#FFF" className="star-4">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="68" cy="35" r="0.5" fill="#FFD700" className="star-5">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="2.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="45" cy="25" r="0.5" fill="#00FFFF" className="star-6">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2.8s" repeatCount="indefinite" />
            </circle>
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
