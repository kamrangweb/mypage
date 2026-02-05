import { useEffect, useRef } from 'react';
import { typewriterTexts } from '../../utils/constants';
import './Hero.css';

const Hero = () => {
  const typewriterRef = useRef(null);
  const textRef = useRef('');
  const isDeleteRef = useRef(false);
  const loopRef = useRef(0);

  useEffect(() => {
    let timeoutId;
    const typeWriter = () => {
      const i = loopRef.current % typewriterTexts.length;
      const fullTxt = typewriterTexts[i];

      if (isDeleteRef.current) {
        textRef.current = fullTxt.substring(0, textRef.current.length - 1);
      } else {
        textRef.current = fullTxt.substring(0, textRef.current.length + 1);
      }

      if (typewriterRef.current) {
        typewriterRef.current.textContent = textRef.current;
      }

      let speed = isDeleteRef.current ? 50 : 100;

      if (!isDeleteRef.current && textRef.current === fullTxt) {
        speed = 1500; // Cümle bittiğinde 1.5 sn bekle
        isDeleteRef.current = true;
      } else if (isDeleteRef.current && textRef.current === '') {
        isDeleteRef.current = false;
        loopRef.current++;
        speed = 500;
      }

      timeoutId = setTimeout(typeWriter, speed);
    };

    typeWriter();
    return () => clearTimeout(timeoutId);
  }, []);

  const scrollToSection = () => {
    const target = document.getElementById('portfolio');
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-title-container">
          <h1>
            <span ref={typewriterRef} className="typewriter-text"></span>
            <span className="cursor"></span>
          </h1>
        </div>
        <p className="hero-subtitle">Full-stack Web Developer & UI Specialist</p>
        <div className="hero-buttons">
          <a href="#portfolio" className="button button-primary">View The Portfolio</a>
          <a href="#contact" className="button button-secondary">Get In Touch</a>
        </div>
      </div>
      
      <button className="scroll-indicator" onClick={scrollToSection} aria-label="Scroll to portfolio">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
    </section>
  );
};

export default Hero;