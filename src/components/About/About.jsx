import './About.css';

const About = () => {
  return (
    <section id="about">
      <div className="container-about">
        <div className="box">
          {/* Dekoratif hover efekti için span */}
          <span></span>
          
          <div className="content">
            <h2 className="text-center">About Me</h2>
            <p>
              Experienced in digital technologies as a skilled <strong>Web Engineer</strong>, 
              I specialize in creating effective solutions in web design and development. 
              My focus is on developing user interfaces, writing and testing code, 
              troubleshooting software issues, and implementing new features to enhance 
              the functionality of web-based products. 
            </p>
            <p style={{ marginTop: '1rem' }}>
              With a strong background in web management, I excel at coordinating 
              cross-functional teams and delivering successful web projects on time. 
              I combine technical expertise with strategic thinking to ensure every 
              project aligns with business objectives and user needs.
            </p>
            
            <div className="text-center about-cta">
              <a href="#contact" className="button button-primary">
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;