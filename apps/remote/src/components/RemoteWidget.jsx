import React, { useState } from 'react';

export default function RemoteWidget({ title = "Analytics Widget (Remote)" }) {
  const [metric, setMetric] = useState(42);

  return (
    <div style={{
      border: '1px solid rgba(6, 182, 212, 0.4)',
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(12px)',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      color: '#f8fafc',
      maxWidth: '420px',
      width: '100%'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <span style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          background: 'rgba(6, 182, 212, 0.2)',
          color: '#38bdf8',
          padding: '4px 8px',
          borderRadius: '6px'
        }}>
          Remote Micro-Frontend
        </span>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Port: 5001</span>
      </div>
      <h3 style={{ margin: '0 0 12px 0', fontSize: '1.25rem', color: '#e2e8f0' }}>{title}</h3>
      <p style={{ margin: '0 0 16px 0', fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.5 }}>
        This widget is federated from the <strong>Remote App</strong> and rendered inside the Host App without iframe.
      </p>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        background: 'rgba(30, 41, 59, 0.7)',
        borderRadius: '10px',
        marginBottom: '16px'
      }}>
        <span style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>Real-time Metric</span>
        <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#38bdf8' }}>{metric}</span>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => setMetric((m) => m + 1)}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: '6px',
            border: 'none',
            background: '#0284c7',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          + Increase
        </button>
        <button
          onClick={() => setMetric((m) => Math.max(0, m - 1))}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid #475569',
            background: 'transparent',
            color: '#cbd5e1',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          - Decrease
        </button>
      </div>
    </div>
  );
}
