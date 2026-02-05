import { useState } from 'react';
import './Navigation.css';

const Navigation = ({ onNavClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => setIsOpen(!isOpen);

  const handleNavItemClick = (id) => {
    setIsOpen(false);
    onNavClick(id);
  };

  return (
    <>
      <header id="mySidebar" className="header" role="banner">
        <div className="container">
          <div className="row">
            <nav className="column-nav" style={{ zIndex: 33 }} role="navigation" aria-label="Main navigation">
              <div className="column">
                <div className="column-avatar-button">
                  <button 
                    onClick={toggleNav}
                    className="close-icon" 
                    title="close menu" 
                    aria-label="Close menu"
                  >
                    <i className="fa fa-remove" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
              <div className="column">
                <div className="margin-bottom-30 name-text">
                  <a href="#" aria-label="Home">
                    <h2 className="margin-bottom-30 hover-underline" id="auto-underline">Kamran Gasimov</h2>
                  </a>
                </div>
                <div className="column-nav-links">
                  <a href="#portfolio" onClick={() => handleNavItemClick('portfolio')} aria-label="View portfolio section">
                    <i className="fa fa-folder-o" aria-hidden="true"></i>Portfolio
                  </a>
                </div>
                <div className="column-nav-links">
                  <a href="#about" onClick={() => handleNavItemClick('about')} aria-label="View about section">
                    <i className="fa fa-user-o" aria-hidden="true"></i>About
                  </a>
                </div>
                <div className="column-nav-links">
                  <a href="#technical" onClick={() => handleNavItemClick('technical')} aria-label="View skills section">
                    <i className="fa fa-file-code-o" aria-hidden="true"></i>Skills
                  </a>
                </div>
                <div className="column-nav-links">
                  <a href="#contact" onClick={() => handleNavItemClick('contact')} aria-label="View contact section">
                    <i className="fa fa-envelope-o" aria-hidden="true"></i>Contact
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
      <div 
        className="overlay hide-large animate-opacity"
        onClick={toggleNav}
        style={{ cursor: 'pointer' }}
        title="close side menu"
      ></div>
    </>
  );
};

export default Navigation;
