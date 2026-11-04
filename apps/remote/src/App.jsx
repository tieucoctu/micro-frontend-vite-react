import React from 'react';
import RemoteButton from './components/RemoteButton';
import RemoteWidget from './components/RemoteWidget';

export default function App() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{
          fontSize: '2rem',
          background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          Remote Micro-Frontend App
        </h1>
        <p style={{ color: '#94a3b8' }}>Standalone Sub-Application (Port 5001)</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
        <RemoteWidget title="Remote App Standalone Mode" />
        <RemoteButton label="Standalone Remote Button" onAction={(c) => console.log('Clicked:', c)} />
      </div>
    </div>
  );
}
