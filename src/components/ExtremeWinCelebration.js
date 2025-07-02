import React, { useEffect, useState } from 'react';
import './ExtremeWinCelebration.css';

const ExtremeWinCelebration = ({ isVisible, onComplete }) => {
  const [animationPhase, setAnimationPhase] = useState('enter');

  useEffect(() => {
    if (!isVisible) return;

    const phases = [
      { phase: 'enter', duration: 500 },
      { phase: 'celebrate', duration: 3000 },
      { phase: 'exit', duration: 800 }
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
            onComplete();
          }
        }, duration);
      }
    };

    runPhase();
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

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
          {/* Cute kitten SVG */}
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
            
            {/* Eyes */}
            <circle cx="43" cy="32" r="3" fill="#000" />
            <circle cx="57" cy="32" r="3" fill="#000" />
            <circle cx="44" cy="31" r="1" fill="#FFF" />
            <circle cx="58" cy="31" r="1" fill="#FFF" />
            
            {/* Nose */}
            <path d="M48 38 L50 35 L52 38 Z" fill="#FFB6C1" />
            
            {/* Mouth */}
            <path d="M50 38 Q45 42 40 40" stroke="#000" strokeWidth="1" fill="none" />
            <path d="M50 38 Q55 42 60 40" stroke="#000" strokeWidth="1" fill="none" />
            
            {/* Whiskers */}
            <line x1="30" y1="35" x2="40" y2="37" stroke="#000" strokeWidth="1" />
            <line x1="30" y1="40" x2="40" y2="40" stroke="#000" strokeWidth="1" />
            <line x1="60" y1="37" x2="70" y2="35" stroke="#000" strokeWidth="1" />
            <line x1="60" y1="40" x2="70" y2="40" stroke="#000" strokeWidth="1" />
            
            {/* Paws */}
            <circle cx="38" cy="85" r="4" fill="#FFE4B5" />
            <circle cx="62" cy="85" r="4" fill="#FFE4B5" />
            
            {/* Tail */}
            <path d="M25 75 Q15 60 20 45" stroke="#FFE4B5" strokeWidth="8" fill="none" />
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
