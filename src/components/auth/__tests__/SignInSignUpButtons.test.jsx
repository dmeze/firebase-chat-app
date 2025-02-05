import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it } from 'vitest';

import SignInSignUpButtons from '@/components/auth/SignInSignUpButtons.jsx';
import { SIGN_IN_LABEL, SIGN_UP_LABEL } from '@/components/auth/constants.js';
import { SIGN_IN_PATH, SIGN_UP_PATH } from "@/lib/constants.js";

describe("@/components/auth/SignInSignUpButtons", () => {
    it("renders sign in and sign up buttons with correct labels", () => {
        render(
            <BrowserRouter>
                <SignInSignUpButtons />
            </BrowserRouter>
        );
        expect(screen.getByText(SIGN_IN_LABEL)).toBeInTheDocument();
        expect(screen.getByText(SIGN_UP_LABEL)).toBeInTheDocument();
    });

    it("sign in button has correct link", () => {
        render(
            <BrowserRouter>
                <SignInSignUpButtons />
            </BrowserRouter>
        );
        expect(screen.getByText(SIGN_IN_LABEL).closest('a')).toHaveAttribute('href', SIGN_IN_PATH);
    });

    it("sign up button has correct link", () => {
        render(
            <BrowserRouter>
                <SignInSignUpButtons />
            </BrowserRouter>
        );
        expect(screen.getByText(SIGN_UP_LABEL).closest('a')).toHaveAttribute('href', SIGN_UP_PATH);
    });
});