import React, { useState } from 'react';
import '../styles/GifPicker.css';

const GifPicker = ({ onGifSelect, isOpen, onClose, userGifs = [] }) => {
  // Working GIFs - you can replace these with your own GIF URLs
  const defaultGifs = [
    {
      id: 1,
      url: 'https://media.giphy.com/media/Cmr1OMJ2FN0B2/giphy.gif',
      title: 'Hello Wave'
    },
    {
      id: 2,
      url: 'https://media.giphy.com/media/111ebonMs90YLu/giphy.gif',
      title: 'Thumbs Up'
    },
    {
      id: 3,
      url: 'https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif',
      title: 'Celebration'
    },
    {
      id: 4,
      url: 'https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif',
      title: 'Mind Blown'
    },
    {
      id: 5,
      url: 'https://media.giphy.com/media/3o7TKF1fSIs1R19B8k/giphy.gif',
      title: 'Dancing'
    },
    {
      id: 6,
      url: 'https://media.giphy.com/media/l0HlKrUU3rBbqaAfu/giphy.gif',
      title: 'Applause'
    },
    {
      id: 7,
      url: 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif',
      title: 'Happy'
    },
    {
      id: 8,
      url: 'https://media.giphy.com/media/3o7btNa0RUYa5E7iiQ/giphy.gif',
      title: 'Laughing'
    },
    {
      id: 9,
      url: 'https://media.giphy.com/media/BPJmthQ3YRwD6QqcVD/giphy.gif',
      title: 'Chef Kiss'
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('trending');
  const allGifs = [...defaultGifs, ...userGifs];

  if (!isOpen) return null;

  const handleGifClick = (gif) => {
    onGifSelect(gif);
    onClose();
  };

  return (
    <div className="gif-picker-overlay" onClick={onClose}>
      <div className="gif-picker" onClick={(e) => e.stopPropagation()}>
        <div className="gif-picker-header">
          <h3>Choose a GIF</h3>
          <button className="gif-picker-close" onClick={onClose}>×</button>
        </div>
        
        <div className="gif-categories">
          <button
            className={`category-btn ${selectedCategory === 'trending' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('trending')}
          >
            Trending
          </button>
          {userGifs.length > 0 && (
            <button
              className={`category-btn ${selectedCategory === 'custom' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('custom')}
            >
              Your GIFs
            </button>
          )}
        </div>

        <div className="gif-search">
          <input 
            type="text" 
            placeholder="Search GIFs..." 
            className="gif-search-input"
          />
        </div>
        
        <div className="gif-grid">
          {selectedCategory === 'trending' && defaultGifs.map((gif) => (
            <div
              key={gif.id}
              className="gif-item"
              onClick={() => handleGifClick(gif)}
            >
              <img 
                src={gif.url} 
                alt={gif.title} 
                loading="lazy"
                onError={(e) => {
                  console.log('Failed to load GIF:', gif.url);
                  e.target.style.display = 'none';
                  const overlay = e.target.parentNode.querySelector('.gif-overlay');
                  const loading = e.target.parentNode.querySelector('.gif-loading');
                  if (overlay) {
                    overlay.classList.add('error');
                    overlay.innerHTML = '<span>⚠️ Failed to load</span>';
                  }
                  if (loading) {
                    loading.style.display = 'none';
                  }
                }}
                onLoad={(e) => {
                  e.target.style.opacity = '1';
                }}
                style={{ opacity: '0' }}
              />
              <div className="gif-overlay">
                <span>{gif.title}</span>
              </div>
              <div className="gif-loading">
                <div className="loading-spinner"></div>
              </div>
            </div>
          ))}
          
          {selectedCategory === 'custom' && userGifs.map((gif, index) => (
            <div
              key={`custom-${index}`}
              className="gif-item"
              onClick={() => handleGifClick(gif)}
            >
              <img src={gif.url} alt={gif.title || 'Custom GIF'} loading="lazy" />
              <div className="gif-overlay">
                <span>{gif.title || 'Custom GIF'}</span>
              </div>
            </div>
          ))}
          
          {allGifs.length === 0 && (
            <div className="no-gifs">
              <p>No GIFs available</p>
              <p className="gif-hint">You can provide your own GIF URLs!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GifPicker;
