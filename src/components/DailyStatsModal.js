import React from 'react';
import { getDailyStats } from '../utils/dailyProgress';

function DailyStatsModal({ onClose }) {
  const stats = getDailyStats();
  const winPercentage = stats.totalDaysPlayed > 0 
    ? Math.round((stats.totalWins / stats.totalDaysPlayed) * 100) 
    : 0;

  const maxDistribution = Math.max(...Object.values(stats.guessDistribution));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Daily Statistics</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="stats-summary">
          <div className="stat-item">
            <div className="stat-number">{stats.totalDaysPlayed}</div>
            <div className="stat-label">Days Played</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{winPercentage}%</div>
            <div className="stat-label">Win Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{stats.currentStreak}</div>
            <div className="stat-label">Current Streak</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{stats.maxStreak}</div>
            <div className="stat-label">Max Streak</div>
          </div>
        </div>

        <div className="guess-distribution">
          <h3>Guess Distribution</h3>
          {Object.entries(stats.guessDistribution).map(([guesses, count]) => (
            <div key={guesses} className="distribution-row">
              <div className="guess-number">{guesses}</div>
              <div className="distribution-bar">
                <div 
                  className="bar-fill"
                  style={{ 
                    width: maxDistribution > 0 ? `${(count / maxDistribution) * 100}%` : '0%' 
                  }}
                >
                  {count > 0 && <span className="bar-count">{count}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <button className="share-button" onClick={() => {
            // TODO: Implement share functionality
            console.log('Share results');
          }}>
            Share Results
          </button>
        </div>
      </div>
    </div>
  );
}

export default DailyStatsModal;
