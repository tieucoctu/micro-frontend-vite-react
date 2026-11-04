import React, { Suspense, lazy, useState, Component } from 'react';

// Lazy-loaded federated components from remoteApp
const RemoteButton = lazy(() => import('remoteApp/RemoteButton'));
const RemoteWidget = lazy(() => import('remoteApp/RemoteWidget'));

// Robust Error Boundary for Micro-Frontends
class RemoteErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Remote MFE Load Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '16px 20px',
          border: '1px dashed #ef4444',
          borderRadius: '12px',
          background: 'rgba(239, 68, 68, 0.1)',
          color: '#fca5a5',
          fontSize: '0.9rem',
          maxWidth: '420px',
          width: '100%'
        }}>
          <strong style={{ display: 'block', marginBottom: '6px', color: '#f87171' }}>
            ⚠️ Failed to load Remote Micro-Frontend
          </strong>
          Make sure the remote app is running on <code>http://localhost:5001</code>.
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [remoteActionLogs, setRemoteActionLogs] = useState([]);
  const [hostCounter, setHostCounter] = useState(0);

  const handleRemoteClick = (count) => {
    setRemoteActionLogs((prev) => [
      `Remote Button clicked (Count: ${count}) at ${new Date().toLocaleTimeString()}`,
      ...prev.slice(0, 4)
    ]);
  };

  return (
    <div style={{ maxWidth: '960px', width: '100%', margin: '0 auto' }}>
      {/* Top Banner / Header */}
      <header style={{
        marginBottom: '2.5rem',
        padding: '24px',
        borderRadius: '16px',
        background: 'rgba(30, 41, 59, 0.5)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
            color: '#fff',
            padding: '4px 10px',
            borderRadius: '9999px',
            textTransform: 'uppercase'
          }}>
            Host Shell Container
          </span>
          <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Port: 5000</span>
        </div>
        <h1 style={{
          fontSize: '2.25rem',
          fontWeight: 800,
          background: 'linear-gradient(to right, #ec4899, #8b5cf6, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px'
        }}>
          Micro-Frontend with Vite & React
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.6 }}>
          Powered by Module Federation (<code>@originjs/vite-plugin-federation</code>). The components below are dynamically fetched at runtime from the Remote App without bundling them together!
        </p>
      </header>

      {/* Main Grid: Host Area + Remote Federated Area */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '24px',
        marginBottom: '2.5rem'
      }}>
        {/* Host App Section */}
        <section style={{
          padding: '24px',
          borderRadius: '16px',
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', color: '#e2e8f0' }}>Host Native State</h2>
            <span style={{
              background: 'rgba(168, 85, 247, 0.15)',
              color: '#c084fc',
              padding: '2px 8px',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: 600
            }}>Local</span>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            This state lives purely within the Host shell app.
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            background: 'rgba(2, 6, 23, 0.6)',
            borderRadius: '10px'
          }}>
            <span style={{ color: '#cbd5e1' }}>Host Counter</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#c084fc' }}>{hostCounter}</span>
          </div>
          <button
            onClick={() => setHostCounter((c) => c + 1)}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(135deg, #9333ea, #c026d3)',
              color: '#fff',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Increment Host Counter
          </button>

          {/* Activity Log */}
          <div style={{ marginTop: '8px' }}>
            <h4 style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '8px' }}>Remote Event Listener:</h4>
            {remoteActionLogs.length === 0 ? (
              <span style={{ fontSize: '0.85rem', color: '#64748b', fontStyle: 'italic' }}>
                No events received from remote component yet.
              </span>
            ) : (
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {remoteActionLogs.map((log, idx) => (
                  <li key={idx} style={{
                    fontSize: '0.8rem',
                    background: 'rgba(6, 182, 212, 0.1)',
                    color: '#38bdf8',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    borderLeft: '3px solid #06b6d4'
                  }}>
                    {log}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Remote Federated Components Section */}
        <section style={{
          padding: '24px',
          borderRadius: '16px',
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', color: '#e2e8f0' }}>Remote Components</h2>
            <span style={{
              background: 'rgba(6, 182, 212, 0.15)',
              color: '#38bdf8',
              padding: '2px 8px',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: 600
            }}>Federated</span>
          </div>

          <RemoteErrorBoundary>
            <Suspense fallback={<div style={{ color: '#94a3b8', padding: '20px' }}>Loading remote component...</div>}>
              <RemoteWidget title="Analytics from Remote" />
            </Suspense>
          </RemoteErrorBoundary>

          <div>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '8px' }}>
              Federated Button with callback triggering Host state:
            </p>
            <RemoteErrorBoundary>
              <Suspense fallback={<div>Loading remote button...</div>}>
                <RemoteButton label="Click Me (Remote)" onAction={handleRemoteClick} />
              </Suspense>
            </RemoteErrorBoundary>
          </div>
        </section>
      </div>

      {/* Footer architecture note */}
      <footer style={{
        textAlign: 'center',
        padding: '16px',
        color: '#64748b',
        fontSize: '0.85rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        Vite Micro-Frontend Demo • React 18 • Module Federation
      </footer>
    </div>
  );
}
