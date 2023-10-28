import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias:{
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [
    react(),
    EnvironmentPlugin('all')
  ],
  server:{
    port: 3060,
  }
})
