import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load environment variables from .env file
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: Number(env.VITE_PORT) || 5173, // Use the loaded VITE_PORT or fallback to 5173
    },
    resolve: {
      alias: {
        '@features': path.resolve(__dirname, 'src/features'),
        '@auth': path.resolve(__dirname, 'src/features/auth'),
        '@routes': path.resolve(__dirname, 'src/routes'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        "@context": path.resolve(__dirname, 'src/context'),
        "@layouts": path.resolve(__dirname, 'src/layouts'),
        "@pages": path.resolve(__dirname, 'src/pages')
      },
    },
  };
});
