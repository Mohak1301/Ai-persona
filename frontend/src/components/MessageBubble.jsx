import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../styles/MessageBubble.css';

const MessageBubble = ({ text, sender, persona, timestamp }) => {
  const isUser = sender === 'user';
  
  const getSenderName = () => {
    if (isUser) return 'You';
    return persona === 'hitesh' ? 'Hitesh' : 'Piyush';
  };

  const getProfilePicture = () => {
    if (isUser) return '/user-profile.jpg';
    return persona === 'hitesh' ? '/hitesh-profile.jpeg' : '/piyush-profile.jpeg';
  };

  const getInitials = () => {
    if (isUser) return 'U';
    return persona === 'hitesh' ? 'H' : 'P';
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }) + ', ' + date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const renderMessageContent = () => {
    // Check if message is a GIF format: [GIF: title](url)
    const gifRegex = /^\[GIF: ([^\]]+)\]\(([^)]+)\)$/;
    const gifMatch = text.match(gifRegex);
    
    if (gifMatch && isUser) {
      const [, title, url] = gifMatch;
      return (
        <div className="gif-message">
          <img 
            src={url} 
            alt={title} 
            className="gif-content"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div className="gif-fallback" style={{ display: 'none' }}>
            GIF: {title}
          </div>
        </div>
      );
    }
    
    // Regular text rendering
    if (isUser) {
      return text;
    } else {
      return (
        <ReactMarkdown
          components={{
            code: ({ node, inline, className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={tomorrow}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
          }}
        >
          {text}
        </ReactMarkdown>
      );
    }
  };

  return (
    <div className={`message-container ${isUser ? 'user' : `assistant ${persona}`}`}>
      {!isUser && (
        <div className="message-profile-picture">
          <img 
            src={getProfilePicture()} 
            alt={getSenderName()}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="profile-fallback">
            {getInitials()}
          </div>
        </div>
      )}
      <div className="message-content-wrapper">
        <div className="message-header">
          <span className="sender-name">{getSenderName()}</span>
          <span className="message-timestamp">{formatTimestamp(timestamp)}</span>
        </div>
        <div className="message-bubble">
          <div className="message-content">
            {renderMessageContent()}
          </div>
        </div>
      </div>
      {isUser && (
        <div className="message-profile-picture user-profile">
          <img 
            src={getProfilePicture()} 
            alt={getSenderName()}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="profile-fallback">
            {getInitials()}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
