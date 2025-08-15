import React, { useState, useRef, useEffect, Fragment } from 'react';
import MentorSwitcher from './MentorSwitcher';
import EmojiPicker from './EmojiPicker';
import GifPicker from './GifPicker';
import '../styles/MessageInput.css';

const MessageInput = ({ onSend, activePersona, onSelectPersona, isLoading }) => {
  const [inputValue, setInputValue] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
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

  const handleEmojiSelect = (emoji) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = inputValue.slice(0, start) + emoji + inputValue.slice(end);
      setInputValue(newValue);
      
      // Set cursor position after emoji
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
        textarea.focus();
      }, 0);
    }
  };

  const handleGifSelect = (gif) => {
    // For GIFs, we'll send them immediately as a message with a special format
    const gifMessage = `[GIF: ${gif.title}](${gif.url})`;
    onSend(gifMessage);
    setShowGifPicker(false);
  };

  return (
    <>
      <div className="message-input-container">
        <form onSubmit={handleSubmit} className="message-input-form">
          <MentorSwitcher 
            activePersona={activePersona} 
            onSelectPersona={onSelectPersona} 
          />
          <div className="input-wrapper">
            <div className="input-container">
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
              <div className="input-actions">
                <button
                  type="button"
                  className="emoji-btn"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  disabled={isLoading}
                >
                  😊
                </button>
                <button
                  type="button"
                  className="gif-btn"
                  onClick={() => setShowGifPicker(!showGifPicker)}
                  disabled={isLoading}
                >
                  GIF
                </button>
              </div>
            </div>
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
      
      <EmojiPicker
        isOpen={showEmojiPicker}
        onEmojiSelect={handleEmojiSelect}
        onClose={() => setShowEmojiPicker(false)}
      />
      
      <GifPicker
        isOpen={showGifPicker}
        onGifSelect={handleGifSelect}
        onClose={() => setShowGifPicker(false)}
      />
    </>
  );
};

export default MessageInput;
