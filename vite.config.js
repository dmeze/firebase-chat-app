import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

export default defineConfig({
    plugins: [react(), tailwindcss()],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
                    react: ['react', 'react-dom'],
                },
            },
        },
    },
    terserOptions: {
        compress: {
            drop_console: true,
            drop_debugger: true
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
});