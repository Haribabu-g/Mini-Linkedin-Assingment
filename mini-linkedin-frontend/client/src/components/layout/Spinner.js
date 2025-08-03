// src/components/layout/Spinner.js
import React from 'react';

// You can add CSS for a fancier spinner
const spinnerStyle = {
  width: '50px',
  height: '50px',
  border: '5px solid #f3f3f3',
  borderTop: '5px solid #0a66c2',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  margin: '2rem auto',
};

const keyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Spinner = () => (
  <>
    <style>{keyframes}</style>
    <div style={spinnerStyle}></div>
  </>
);

export default Spinner;
