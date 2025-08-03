
import React from 'react';

const footerStyle = {
  backgroundColor: '#f3f2ef',
  color: '#666',
  textAlign: 'center',
  padding: '1rem 0',
  position: 'relative',
  bottom: '0',
  width: '100%',
  marginTop: '2rem',
  borderTop: '1px solid #ddd'
};

const linkStyle = {
    color: '#0a66c2',
    textDecoration: 'none',
    fontWeight: 'bold'
};

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p>
        &copy; {new Date().getFullYear()} Mini-LinkedIn Clone by{' '}
        <a 
          href="https://www.linkedin.com/in/haribabu-g/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={linkStyle}
        >
          @haribabu
        </a>
      </p>
    </footer>
  );
};

export default Footer;
