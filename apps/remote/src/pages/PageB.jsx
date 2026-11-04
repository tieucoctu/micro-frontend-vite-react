import React, { useState } from 'react';
import { debounce } from 'lodash-es';

export default function PageB() {
  const [clicks, setClicks] = useState(0);
  const [debouncedClicks, setDebouncedClicks] = useState(0);

  const debouncedHandler = debounce((val) => {
    setDebouncedClicks(val);
  }, 500);

  const handleClick = () => {
    const next = clicks + 1;
    setClicks(next);
    debouncedHandler(next);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #c084fc', borderRadius: '12px', background: 'rgba(192, 132, 252, 0.05)', marginTop: '15px' }}>
      <h3 style={{ color: '#c084fc', margin: '0 0 8px 0' }}>📄 Page B (Dynamically Loaded)</h3>
      <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: '0 0 12px 0' }}>
        Sử dụng: <code>{'{ debounce }'} from 'lodash-es'</code>
      </p>
      <button
        onClick={handleClick}
        style={{
          padding: '10px 18px',
          borderRadius: '8px',
          border: 'none',
          background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
          color: '#fff',
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        Click liên tục vào Page B ({clicks})
      </button>
      <div style={{ marginTop: '12px', fontSize: '0.9rem', color: '#cbd5e1' }}>
        Debounced Clicks: <strong style={{ color: '#c084fc' }}>{debouncedClicks}</strong>
      </div>
    </div>
  );
}
