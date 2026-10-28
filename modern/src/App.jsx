import React, { useState } from 'react';

export default function App() {
  const [status] = useState('Modern scaffold ready');

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 24, maxWidth: 640 }}>
      <h1>OpenLaser — Modern Scaffold</h1>
      <p>{status}</p>
      <p>
        This is a parallel React 18 + Vite starting point.
        The original Webpack version remains the stable production path.
      </p>
      <ul>
        <li>React 18</li>
        <li>Vite</li>
        <li>Ready for gradual migration of CAM and connection logic</li>
      </ul>
      <p style={{ color: '#666', fontSize: 14 }}>
        Next steps: port connection status, then G-code generation, then the main workspace.
      </p>
    </div>
  );
}
