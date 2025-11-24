// components/Footer.js
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Instagram, 
  Twitter,
  Phone,
  Email,
  LocationOn,
  Restaurant
} from '@mui/icons-material';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>
            <Restaurant className="logo-icon" />
            TasteBite
          </h3>
          <p>Fresh. Fast. Delicious. Your favorite meals delivered right to your door.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">
              <Facebook />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <ul>
            <li>
              <Phone className="contact-icon" />
              03 123 456
            </li>
            <li>
              <Email className="contact-icon" />
              hello@tastebite.com
            </li>
            <li>
              <LocationOn className="contact-icon" />
              Tyre, Tyre City
            </li>
          </ul>
        </div>


      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} TasteBite. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;