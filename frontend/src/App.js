import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LandingPage from './components/LandingPage';
import PersonaSelector from './components/PersonaSelector';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import './styles/App.css';

function App() {
  const [activePersona, setActivePersona] = useState('hitesh');
  const [conversations, setConversations] = useState({
    hitesh: [],
    piyush: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Clean URL hash fragments on component mount
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, null, window.location.pathname);
    }
  }, []);

  const getDefaultMessage = (persona) => {
    if (persona === 'hitesh') {
      return {
        text: "Hey there! 👋 I'm Hitesh Choudhary, your tech mentor. I'm here to help you with modern JavaScript, React, Next.js, and all things web development. What would you like to learn today?",
        sender: 'assistant',
        timestamp: new Date().toISOString()
      };
    } else {
      return {
        text: "Hello! I'm Piyush Garg, your coding mentor. I specialize in System Design, React, and Node.js. Ready to dive into some practical coding challenges? Let's build something amazing together! 🚀",
        sender: 'assistant',
        timestamp: new Date().toISOString()
      };
    }
  };

  const handleSend = async (message) => {
    // Add user message to conversation with timestamp
    const userMessage = { 
      text: message, 
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    setConversations(prev => ({
      ...prev,
      [activePersona]: [...prev[activePersona], userMessage]
    }));

    setIsLoading(true);

    try {
      // Prepare conversation history for API
      const currentConversation = conversations[activePersona];
      const history = currentConversation.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${apiUrl}/chat`, {
        persona: activePersona,
        message: message,
        history: history
      });

      // Add assistant response to conversation with timestamp
      const assistantMessage = { 
        text: response.data.reply, 
        sender: 'assistant',
        timestamp: new Date().toISOString()
      };
      setConversations(prev => ({
        ...prev,
        [activePersona]: [...prev[activePersona], assistantMessage]
      }));
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message to conversation with timestamp
      const errorMessage = { 
        text: 'Sorry, I encountered an error. Please try again.', 
        sender: 'assistant',
        timestamp: new Date().toISOString()
      };
      setConversations(prev => ({
        ...prev,
        [activePersona]: [...prev[activePersona], errorMessage]
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPersona = (persona) => {
    setActivePersona(persona);
    setShowChat(true);
    
    // Add default message if this is the first time selecting this persona
    if (conversations[persona].length === 0) {
      const defaultMessage = getDefaultMessage(persona);
      setConversations(prev => ({
        ...prev,
        [persona]: [defaultMessage]
      }));
    }
  };

  const handleClearChat = () => {
    setConversations(prev => ({
      ...prev,
      [activePersona]: []
    }));
  };

  const handleBackToLanding = () => {
    setShowChat(false);
  };

  const getMessageCount = () => {
    return conversations[activePersona].length;
  };

  if (!showChat) {
    return <LandingPage onSelectPersona={handleSelectPersona} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <PersonaSelector 
          activePersona={activePersona} 
          onSelectPersona={handleSelectPersona}
          messageCount={getMessageCount()}
          onClearChat={handleClearChat}
          onBackToLanding={handleBackToLanding}
        />
      </header>
      
      <main className="app-main">
        <ChatWindow 
          messages={conversations[activePersona]} 
          activePersona={activePersona} 
          isLoading={isLoading}
        />
        <MessageInput 
          onSend={handleSend} 
          activePersona={activePersona} 
          onSelectPersona={handleSelectPersona}
          isLoading={isLoading} 
        />
      </main>
    </div>
  );
}

export default App;
