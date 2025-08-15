import React, { useState, useRef, useEffect } from 'react';
import MentorSwitcher from './MentorSwitcher';
import '../styles/MessageInput.css';

const MessageInput = ({ onSend, activePersona, onSelectPersona, isLoading }) => {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSend(inputValue.trim());
      setInputValue('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="message-input-container">
      <form onSubmit={handleSubmit} className="message-input-form">
        <MentorSwitcher 
          activePersona={activePersona} 
          onSelectPersona={onSelectPersona} 
        />
        <div className="input-wrapper">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask your mentor anything..."
            disabled={isLoading}
            className="message-input"
            rows={1}
          />
          <div className="input-hints">
            Press [Enter] to send, [Shift + Enter] for new line
          </div>
        </div>
        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          className={`send-button ${activePersona}`}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
