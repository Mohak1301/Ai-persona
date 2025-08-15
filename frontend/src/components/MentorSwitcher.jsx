import React, { useState } from 'react';
import '../styles/MentorSwitcher.css';

const MentorSwitcher = ({ activePersona, onSelectPersona }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const getPersonaName = () => {
    return activePersona === 'hitesh' ? 'Hitesh' : 'Piyush';
  };

  const getProfilePicture = () => {
    return activePersona === 'hitesh' ? '/hitesh-profile.jpeg' : '/piyush-profile.jpeg';
  };

  const handlePersonaSelect = (persona) => {
    onSelectPersona(persona);
    setShowDropdown(false);
  };

  return (
    <div className="mentor-switcher">
      <button 
        className="mentor-selector-btn"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div className="selector-profile">
          <img 
            src={getProfilePicture()} 
            alt={getPersonaName()}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="selector-fallback">
            {getPersonaName().charAt(0)}
          </div>
        </div>
        <span className="selector-name">{getPersonaName()} Sir</span>
        <span className="selector-chevron">▼</span>
      </button>
      
      {showDropdown && (
        <div className="mentor-dropdown">
          <div 
            className={`dropdown-item ${activePersona === 'hitesh' ? 'active' : ''}`}
            onClick={() => handlePersonaSelect('hitesh')}
          >
            <div className="dropdown-profile">
              <img 
                src="/hitesh-profile.jpeg" 
                alt="Hitesh"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="dropdown-fallback">H</div>
            </div>
            <div className="dropdown-info">
              <div className="dropdown-name">Hitesh Sir</div>
              <div className="dropdown-role">React Expert</div>
            </div>
          </div>
          
          <div 
            className={`dropdown-item ${activePersona === 'piyush' ? 'active' : ''}`}
            onClick={() => handlePersonaSelect('piyush')}
          >
            <div className="dropdown-profile">
              <img 
                src="/piyush-profile.jpeg" 
                alt="Piyush"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="dropdown-fallback">P</div>
            </div>
            <div className="dropdown-info">
              <div className="dropdown-name">Piyush Sir</div>
              <div className="dropdown-role">System Design</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorSwitcher;
