import React, { useState } from 'react';
import { debounce } from 'lodash-es';

export default function PageA() {
  const [text, setText] = useState('');
  const [debouncedText, setDebouncedText] = useState('');

  const debouncedHandler = debounce((val) => {
    setDebouncedText(val);
  }, 500);

  const handleChange = (e) => {
    setText(e.target.value);
    debouncedHandler(e.target.value);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #38bdf8', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.05)', marginTop: '15px' }}>
      <h3 style={{ color: '#38bdf8', margin: '0 0 8px 0' }}>📄 Page A (Dynamically Loaded)</h3>
      <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: '0 0 12px 0' }}>
        Sử dụng: <code>{'{ debounce }'} from 'lodash-es'</code>
      </p>
      <input
        type="text"
        placeholder="Gõ nhanh để test debounce 500ms..."
        value={text}
        onChange={handleChange}
        style={{
          padding: '10px 14px',
          borderRadius: '8px',
          border: '1px solid #334155',
          background: '#0f172a',
          color: '#f8fafc',
          width: '100%',
          boxSizing: 'border-box'
        }}
      />
      <div style={{ marginTop: '12px', fontSize: '0.9rem', color: '#cbd5e1' }}>
        Kết quả Debounced: <strong style={{ color: '#38bdf8' }}>{debouncedText || '(chưa nhập)'}</strong>
      </div>
    </div>
  );
}
