import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/UAS-ABO/', // ✅ ini WAJIB
  plugins: [react()],
});
