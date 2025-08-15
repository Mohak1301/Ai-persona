import React from 'react';
import '../styles/PersonaSelector.css';

const PersonaSelector = ({ activePersona, onSelectPersona, messageCount, onClearChat, onBackToLanding }) => {
  const getPersonaName = () => {
    return activePersona === 'hitesh' ? 'Hitesh' : 'Piyush';
  };

  const getProfilePicture = () => {
    return activePersona === 'hitesh' ? '/hitesh-profile.jpeg' : '/piyush-profile.jpeg';
  };

  return (
    <div className="persona-header">
      <div className="persona-info">
        <div className="persona-profile-section">
          <div className="profile-picture">
            <img 
              src={getProfilePicture()} 
              alt={getPersonaName()}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="profile-fallback">
              {getPersonaName().charAt(0)}
            </div>
            <div className="status-dot"></div>
          </div>
          <div className="persona-details">
            <div className="persona-name-section">
              <h2 className="persona-name">{getPersonaName()}</h2>
              <div className="status-indicator">
                <div className="online-dot"></div>
                <span className="status-text">Ready to help</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="header-actions">
        <button className="back-btn" onClick={onBackToLanding}>
          ← Back
        </button>
        <button className="clear-chat-btn" onClick={onClearChat}>
          Clear Chat
        </button>
      </div>
    </div>
  );
};

export default PersonaSelector;
