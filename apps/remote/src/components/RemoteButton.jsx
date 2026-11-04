import React, { useState } from 'react';

export default function RemoteButton({ label = 'Remote Button', onAction }) {
  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    const next = clicks + 1;
    setClicks(next);
    if (onAction) {
      onAction(next);
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: '10px 20px',
        fontSize: '0.95rem',
        fontWeight: '600',
        color: '#ffffff',
        background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        boxShadow: '0 4px 14px rgba(6, 182, 212, 0.4)',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(6, 182, 212, 0.6)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 14px rgba(6, 182, 212, 0.4)';
      }}
    >
      ⚡ {label} ({clicks})
    </button>
  );
}
