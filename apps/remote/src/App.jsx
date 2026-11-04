import React, { useState, Suspense, lazy } from 'react';

// Dynamic import() PageA & PageB
const PageA = lazy(() => import('./pages/PageA'));
const PageB = lazy(() => import('./pages/PageB'));

export default function App() {
  const [activePage, setActivePage] = useState(null);

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem 1rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{
          fontSize: '2rem',
          background: 'linear-gradient(to right, #38bdf8, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px'
        }}>
          Demo Vite Shared Chunks & Dynamic Import
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
          PageA và PageB đều import <code>{'{ debounce }'} from 'lodash-es'</code> và được tải bất đồng bộ bằng <code>import()</code>.
        </p>
      </header>

      {/* Buttons to trigger dynamic import */}
      <div style={{
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        background: 'rgba(15, 23, 42, 0.6)',
        padding: '16px',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <button
          onClick={() => setActivePage('A')}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: activePage === 'A' ? '2px solid #38bdf8' : '1px solid #334155',
            background: activePage === 'A' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(30, 41, 59, 0.8)',
            color: activePage === 'A' ? '#38bdf8' : '#cbd5e1',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          🚀 Tải & Mở Page A (import())
        </button>

        <button
          onClick={() => setActivePage('B')}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: activePage === 'B' ? '2px solid #c084fc' : '1px solid #334155',
            background: activePage === 'B' ? 'rgba(192, 132, 252, 0.2)' : 'rgba(30, 41, 59, 0.8)',
            color: activePage === 'B' ? '#c084fc' : '#cbd5e1',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          🚀 Tải & Mở Page B (import())
        </button>

        {activePage && (
          <button
            onClick={() => setActivePage(null)}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              border: '1px solid #64748b',
              background: 'transparent',
              color: '#94a3b8',
              cursor: 'pointer'
            }}
          >
            Đóng
          </button>
        )}
      </div>

      {/* Dynamic Content Section */}
      <div style={{ marginTop: '20px' }}>
        <Suspense fallback={<div style={{ textAlign: 'center', color: '#94a3b8', padding: '20px' }}>⏳ Đang nạp chunk qua dynamic import()...</div>}>
          {activePage === 'A' && <PageA />}
          {activePage === 'B' && <PageB />}
        </Suspense>
      </div>

      {/* Info card */}
      <div style={{
        marginTop: '2rem',
        padding: '16px 20px',
        borderRadius: '12px',
        background: 'rgba(2, 6, 23, 0.6)',
        border: '1px solid rgba(71, 85, 105, 0.3)',
        fontSize: '0.85rem',
        color: '#94a3b8',
        lineHeight: 1.6
      }}>
        💡 <strong>Cơ chế Rollup / Vite:</strong> Khi cả 2 dynamic chunk (PageA & PageB) cùng phụ thuộc vào một module (như <code>debounce</code> từ <code>lodash-es</code>), Vite/Rollup sẽ tự động tách <code>debounce</code> ra thành một <strong>shared chunk</strong> riêng trong <code>dist/assets/</code> để không bị lặp mã nguồn giữa PageA và PageB.
      </div>
    </div>
  );
}
