import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.REACT_APP_RAPIDAPI_KEY': JSON.stringify(process.env.REACT_APP_RAPIDAPI_KEY),
    'process.env.REACT_APP_IPIFY_API_KEY': JSON.stringify(process.env.REACT_APP_IPIFY_API_KEY)
  }
});
