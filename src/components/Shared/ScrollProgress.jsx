import { useScrollProgress } from '../../hooks/useScrollEffect';
import './ScrollProgress.css';

const ScrollProgress = () => {
  // Hook'tan gelen değerin 0-100 arası bir rakam olduğunu varsayıyorum
  const scrollValue = useScrollProgress(); 

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sayfa çok az kaydırılmışsa butonu gösterme
  if (scrollValue < 5) return null;

  return (
    <div id="progress" className="pulse">
      <div id="progress-value">
        <button 
          className="back-to-top" 
          type="button"
          onClick={handleBackToTop}
          aria-label="Back to top"
          style={{ '--scroll-value': `${scrollValue}%` }} // CSS'e değeri gönderiyoruz
        >
          <i className="fa fa-arrow-up" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
};

export default ScrollProgress;