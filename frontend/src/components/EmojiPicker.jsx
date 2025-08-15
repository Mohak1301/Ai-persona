import React, { useState } from 'react';
import '../styles/EmojiPicker.css';

const EmojiPicker = ({ onEmojiSelect, isOpen, onClose }) => {
  const emojiCategories = {
    faces: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳'],
    gestures: ['👍', '👎', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👋', '🤚', '🖐️', '✋', '🖖', '👏', '🙌', '🤲', '🤝', '🙏'],
    hearts: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟'],
    objects: ['💻', '📱', '⌚', '📷', '🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎪', '🎊', '🎉', '🎈', '🎀', '🎁', '🏆', '🥇', '🥈', '🥉'],
    nature: ['🌍', '🌎', '🌏', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌙', '🌛', '🌜', '⭐', '🌟', '💫', '✨', '☄️', '☀️', '🌤️', '⛅', '🌦️', '🌧️', '⛈️', '🌩️', '❄️', '☃️', '⛄', '🌈']
  };

  const [activeCategory, setActiveCategory] = useState('faces');

  if (!isOpen) return null;

  const handleEmojiClick = (emoji) => {
    onEmojiSelect(emoji);
    onClose();
  };

  return (
    <div className="emoji-picker-overlay" onClick={onClose}>
      <div className="emoji-picker" onClick={(e) => e.stopPropagation()}>
        <div className="emoji-picker-header">
          <h3>Choose an emoji</h3>
          <button className="emoji-picker-close" onClick={onClose}>×</button>
        </div>
        
        <div className="emoji-categories">
          {Object.keys(emojiCategories).map((category) => (
            <button
              key={category}
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="emoji-grid">
          {emojiCategories[activeCategory].map((emoji, index) => (
            <button
              key={index}
              className="emoji-btn"
              onClick={() => handleEmojiClick(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmojiPicker;
