import React from 'react';
import '../styles/TypingIndicator.css';

const TypingIndicator = ({ persona }) => {
  const getPersonaName = () => {
    return persona === 'hitesh' ? 'Hitesh' : 'Piyush';
  };

  const getProfilePicture = () => {
    return persona === 'hitesh' ? '/hitesh-profile.jpeg' : '/piyush-profile.jpeg';
  };

  const getInitials = () => {
    return persona === 'hitesh' ? 'H' : 'P';
  };

  return (
    <div className={`typing-container assistant ${persona}`}>
      <div className="message-profile-picture">
        <img 
          src={getProfilePicture()} 
          alt={getPersonaName()}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="profile-fallback">
          {getInitials()}
        </div>
      </div>
      <div className="typing-content-wrapper">
        <div className="typing-bubble">
          <div className="typing-text">
            {getPersonaName()} is typing
          </div>
          <div className="typing-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
