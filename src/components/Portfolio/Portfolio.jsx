import { portfolioProjects } from '../../utils/constants';
import './Portfolio.css';
// 1. Resmi direkt import ediyoruz (Yolun doğruluğundan emin ol)
import defaultImage from '../../assets/Screenshot_5-2-2026_155854_new.express.adobe.com.jpeg';

const Portfolio = () => {
  return (
    <section id="portfolio" className="portfolio">
      <div className="portfolio-container">
        <div className="section-header">
          <h2>Featured Projects</h2>
          <p>A collection of recent work and open source projects</p>
        </div>

        <div className="portfolio-grid">
          {portfolioProjects.map((project) => (
            <div key={project.id} className="portfolio-card">
             
<div className="card-image">
  <img
    src={project.image || defaultImage}
    alt={project.title}
    loading="lazy"
    onError={(e) => {
      if (e.target.src !== defaultImage) {
        e.target.onerror = null;
        e.target.src = defaultImage;
      }
    }}
  />
  {/* Yeni eklenen gölge katmanı */}
  <div className="image-shadow-fade"></div> 
  
  <div className="card-overlay">
    <a href={project.link} target="_blank" rel="noopener noreferrer" className="button project-button">
      View Project
    </a>
  </div>
</div>


              <div className="card-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                {project.tags && (
                  <div className="card-tags">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;