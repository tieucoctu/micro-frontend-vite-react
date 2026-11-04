import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
      title: 'Vite Chunk Visualizer - PageA & PageB & Lodash-es'
    })
  ],
  server: {
    port: 5001,
    strictPort: true
  },
  preview: {
    port: 5001,
    strictPort: true
  }
});
