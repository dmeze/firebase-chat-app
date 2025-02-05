import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import Home from '@/pages/Home';
import { DESCRIPTION_TEXT, WELCOME_TEXT } from "@/pages/constants.js";

describe('@/pages/Home', () => {
    it('renders welcome text correctly', () => {
        render(<Home />);
        expect(screen.getByText(WELCOME_TEXT)).toBeInTheDocument();
    });

    it('renders description text correctly', () => {
        render(<Home />);
        expect(screen.getByText(DESCRIPTION_TEXT)).toBeInTheDocument();
    });

    it('applies correct styles to welcome text', () => {
        render(<Home />);
        const welcomeText = screen.getByText(WELCOME_TEXT);
        expect(welcomeText).toHaveClass('text-4xl font-bold mb-4');
    });

    it('applies correct styles to description text', () => {
        render(<Home />);
        const descriptionText = screen.getByText(DESCRIPTION_TEXT);
        expect(descriptionText).toHaveClass('text-lg text-gray-600');
    });
});