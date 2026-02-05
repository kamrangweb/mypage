import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="row-contact">
      <div className="contact-header">
        <h2>Contact Info</h2>
      </div>

      <div className="contact-details">
        <div className="contact-details-list">
          {/* E-mail Card */}
          <div className="contact-details-item">
            <i className="fa fa-envelope"></i>
            <h4>E-mail</h4>
            <p>
              <a href="mailto:kamranqasiimov@gmail.com">kamranqasiimov@gmail.com</a>
            </p>
          </div>

          {/* LinkedIn Card */}
          <div className="contact-details-item">
            <i className="fa fa-linkedin"></i>
            <h4>LinkedIn</h4>
            <p>
              <a href="https://linkedin.com/in/YOUR_USERNAME" target="_blank" rel="noopener noreferrer">
                Professional Profile
              </a>
            </p>
          </div>

          {/* Location Card */}
          <div className="contact-details-item">
            <i className="fa fa-map-marker"></i>
            <h4>Location</h4>
            <p>
              <a 
                href="https://www.google.com/maps/search/Baku+Azerbaijan" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Baku, Azerbaijan
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;