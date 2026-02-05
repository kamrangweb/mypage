import { getCurrentYear } from '../../utils/helpers';
import './Footer.css';

const Footer = () => {
  return (
    /* footer'ı ana sarmalayıcı yapıyoruz ki arka plan rengi tam yayılsın */
    <footer className="footer-main"> 
      <div className="container">
        <div className="row">
          <div className="column copyright">
            <p>
              <strong>Kamran Gasimov</strong> &copy; {getCurrentYear()} All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;