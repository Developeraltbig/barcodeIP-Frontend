import React from 'react';

const FullPageLoader = ({ colors = ['#2563eb', '#7c3aed', '#db2777'], label = 'Loading...' }) => {
  return (
    <div style={overlayStyle}>
      <div style={centerContainer}>
        {/* Animated Three Dots SVG */}
        <svg width="80" height="30" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg">
          {/* Dot 1 */}
          <circle cx="15" cy="15" r="15" fill={colors[0]}>
            <animate
              attributeName="r"
              from="15"
              to="15"
              begin="0s"
              dur="0.8s"
              values="15;9;15"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="fill-opacity"
              from="1"
              to="1"
              begin="0s"
              dur="0.8s"
              values="1;.5;1"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>

          {/* Dot 2 */}
          <circle cx="60" cy="15" r="9" fill={colors[1]}>
            <animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite" />
            <animate
              attributeName="fill-opacity"
              from="0.5"
              to="0.5"
              begin="0s"
              dur="0.8s"
              values=".5;1;.5"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>

          {/* Dot 3 */}
          <circle cx="105" cy="15" r="15" fill={colors[2]}>
            <animate
              attributeName="r"
              from="15"
              to="15"
              begin="0s"
              dur="0.8s"
              values="15;9;15"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="fill-opacity"
              from="1"
              to="1"
              begin="0s"
              dur="0.8s"
              values="1;.5;1"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        {/* Label */}
        {label && <div style={labelStyle}>{label}</div>}
      </div>
    </div>
  );
};

/* --- Centering Styles --- */
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(255, 255, 255, 0.85)', // Slight transparency
  backdropFilter: 'blur(10px)', // Modern glass effect
  display: 'flex',
  alignItems: 'center', // Vertical Center
  justifyContent: 'center', // Horizontal Center
  zIndex: 999998 // Just below ToastContainer
};

const centerContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
};

const labelStyle = {
  marginTop: '20px',
  fontSize: '15px',
  fontWeight: '600',
  color: '#475569',
  letterSpacing: '0.5px',
  fontFamily: 'inherit'
};

export default FullPageLoader;
