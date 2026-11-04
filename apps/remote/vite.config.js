import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remoteApp',
      filename: 'remoteEntry.js',
      exposes: {
        './RemoteButton': './src/components/RemoteButton.jsx',
        './RemoteWidget': './src/components/RemoteWidget.jsx',
        './RemoteApp': './src/App.jsx'
      },
      shared: ['react', 'react-dom']
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  server: {
    port: 5001,
    strictPort: true,
    cors: true
  },
  preview: {
    port: 5001,
    strictPort: true,
    cors: true
  }
});
