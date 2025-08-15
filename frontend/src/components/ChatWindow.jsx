import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import '../styles/ChatWindow.css';

const ChatWindow = ({ messages, activePersona, isLoading }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="chat-window">
      {messages.length === 0 ? (
        <div className="empty-chat">
          <p>Start a conversation with {activePersona === 'hitesh' ? 'Hitesh' : 'Piyush'}!</p>
        </div>
      ) : (
        <div className="messages-container">
          {messages.map((message, index) => (
            <React.Fragment key={index}>
              <MessageBubble
                text={message.text}
                sender={message.sender}
                persona={activePersona}
                timestamp={message.timestamp}
              />
              {index < messages.length - 1 && <div className="message-separator"></div>}
            </React.Fragment>
          ))}
          {isLoading && (
            <TypingIndicator persona={activePersona} />
          )}
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow;
