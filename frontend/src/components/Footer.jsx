import React from 'react';

export default function Footer({ setActivePage }) {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>PRECISION</h3>
            <p>Engineered for the next generation of digital infrastructure. High-performance, secure, and ready-to-deploy software.</p>
            <div className="social-links">
              <a href="#github" className="social-btn">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a href="#globe" className="social-btn">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Marketplace</h4>
            <ul>
              <li><a href="#products" onClick={() => setActivePage('products')}>Latest Releases</a></li>
              <li><a href="#products" onClick={() => setActivePage('products')}>Top Templates</a></li>
              <li><a href="#products" onClick={() => setActivePage('products')}>Custom Solutions</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="#docs">Documentation</a></li>
              <li><a href="#api">API Reference</a></li>
              <li><a href="#community">Community</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Support & Company</h4>
            <ul>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); setActivePage('about'); }}>About Us</a></li>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#licensing">Licensing</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); setActivePage('home'); setTimeout(() => { document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth' }); }, 100); }}>Contact Sales</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">© 2026 Precision Intelligence Agency. All rights reserved.</p>
          <div className="legal-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Policy</a>
            <a href="#sitemap">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
