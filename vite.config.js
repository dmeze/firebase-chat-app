import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

export default defineConfig({
    plugins: [react(), tailwindcss()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.js',
        testMatch: 'src/**/*.test.jsx',
        coverage: {
            exclude: ['src/**/*.test.jsx'],
            include: ['src/**/*.jsx', 'src/**/*.js'],
            thresholds: {
                global: {
                    statements: 90,
                    branches: 90,
                    functions: 90,
                    lines: 90,
                },
            },
            extensions: ['.js', '.jsx'],
            reporter: ['text']
        }
    },
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