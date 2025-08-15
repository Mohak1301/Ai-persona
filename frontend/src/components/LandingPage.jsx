import React from 'react';
import '../styles/LandingPage.css';

const LandingPage = ({ onSelectPersona }) => {
  return (
    <div className="landing-page">
                     {/* Navigation Bar */}
               <nav className="navbar">
                 <div className="nav-brand">
                   <div className="animated-logo">
                     <span className="brand-name">Chai Aur ChitChat</span>
                   </div>
                 </div>
                 <div className="central-floating-emoji">☕</div>
                 <div className="nav-menu">
                 </div>
               </nav>

      {/* Main Content */}
      <div className="main-content">
                                          {/* Left Section */}
                 <div className="content-left">
                   <div className="hero-section">
                     <h1 className="hero-heading">
                       Connect with your <span className="highlight">AI mentors</span> over chai! ☕
                     </h1>
                     <p className="hero-description">
                       Chai Aur Chit Chat makes your learning experience with industry experts more engaging and fun. 
                       Get personalized guidance, code reviews, and career advice from the best tech mentors while enjoying virtual chai!
                     </p>
                   </div>
                 </div>

                 {/* Right Section - Mentor Selection */}
                 <div className="content-right">
                   <div className="mentor-selection-section">
                     <div className="mentor-label">CHAT WITH MENTORS</div>
                     <div className="mentor-cards">
                       <div 
                         className="mentor-card hitesh-card"
                         onClick={() => onSelectPersona('hitesh')}
                       >
                         <div className="mentor-info">
                           <div className="mentor-name">Hitesh</div>
                           <div className="mentor-role">React Expert</div>
                         </div>
                         <div className="mentor-avatar">
                           <img 
                             src="/hitesh-profile.jpeg" 
                             alt="Hitesh"
                             className="mentor-profile-img"
                             onError={(e) => {
                               e.target.style.display = 'none';
                               e.target.nextSibling.style.display = 'flex';
                             }}
                           />
                           <span className="mentor-emoji">👨‍💻</span>
                         </div>
                       </div>
                       <div 
                         className="mentor-card piyush-card"
                         onClick={() => onSelectPersona('piyush')}
                       >
                         <div className="mentor-info">
                           <div className="mentor-name">Piyush</div>
                           <div className="mentor-role">System Design</div>
                         </div>
                         <div className="mentor-avatar">
                           <img 
                             src="/piyush-profile.jpeg" 
                             alt="Piyush"
                             className="mentor-profile-img"
                             onError={(e) => {
                               e.target.style.display = 'none';
                               e.target.nextSibling.style.display = 'flex';
                             }}
                           />
                           <span className="mentor-emoji">🧑‍💼</span>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
      </div>
    </div>
  );
};

export default LandingPage;
