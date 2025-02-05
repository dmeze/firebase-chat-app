import React from "react";
import ReactDOM from "react-dom/client";
import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import App from '../App';

describe('index', () => {
    it('renders App component without crashing', () => {
        const div = document.createElement('div');
        document.body.appendChild(div);
        render(<App />, { container: div });
        expect(screen.getAllByText('Loading...')[0]).toBeInTheDocument();
    });

    it('renders App component with StrictMode', () => {
        const div = document.createElement('div');
        document.body.appendChild(div);
        render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
            { container: div }
        );
        expect(screen.getAllByText('Loading...')[0]).toBeInTheDocument();
    });

    it('renders App component with root element', () => {
        const root = document.createElement('div');
        root.id = 'root';
        root.textContent = 'root';
        document.body.appendChild(root);
        const rootElement = ReactDOM.createRoot(root);
        rootElement.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        );
        expect(screen.getByText('root')).toBeInTheDocument();
    });
});