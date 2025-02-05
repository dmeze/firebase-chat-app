import { vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { logEvent } from 'firebase/analytics';
import { MemoryRouter } from 'react-router-dom';

import { logUserError } from '@/lib/analytics.js';
import { HOME_PATH, SIGN_UP_PATH } from '@/lib/constants.js';
import { SIGN_UP_LABEL, signInFields } from '@/components/auth/constants.js';
import { auth } from '@/lib/firebase.js';

import SignIn from '../SignIn';

vi.mock('firebase/auth', () => ({
    signInWithEmailAndPassword: vi.fn(),
    getAuth: vi.fn()
}));

vi.mock('firebase/analytics', () => ({
    logEvent: vi.fn(),
    analytics: {},
    getAnalytics: vi.fn()
}));

vi.mock('@/lib/analytics.js', () => ({
    logUserError: vi.fn(),
}));

const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockedNavigate,
    };
});

describe('@/pages/SignIn', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the sign in form with all fields and sign up link', () => {
        render(
            <MemoryRouter>
                <SignIn />
            </MemoryRouter>
        );
        expect(screen.getByTestId("signin-button")).toBeInTheDocument();

        signInFields.forEach((field) => {
            expect(screen.getByLabelText(`${field.label}:`)).toBeInTheDocument();
        });

        expect(screen.getByText(SIGN_UP_LABEL)).toBeInTheDocument();
        expect(screen.getByText(SIGN_UP_LABEL).closest('a')).toHaveAttribute('href', SIGN_UP_PATH);
    });

    it('calls signInWithEmailAndPassword, logs event, and navigates on successful sign in', async () => {
        const emailValue = 'test@example.com';
        const passwordValue = 'password123';

        signInWithEmailAndPassword.mockResolvedValue({ user: { uid: 'user123' } });

        render(
            <MemoryRouter>
                <SignIn />
            </MemoryRouter>
        );

        const emailInput = screen.getByLabelText('Email:');
        const passwordInput = screen.getByLabelText('Password:');

        fireEvent.change(emailInput, { target: { value: emailValue } });
        fireEvent.change(passwordInput, { target: { value: passwordValue } });

        fireEvent.submit(emailInput.closest('form'));

        await waitFor(() => {
            expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, emailValue, passwordValue);
        });

        expect(logEvent).toHaveBeenCalledWith(undefined, 'login', { method: 'email', email: emailValue });
        expect(mockedNavigate).toHaveBeenCalledWith(HOME_PATH);
    });

    it('displays an error message and logs error on sign in failure', async () => {
        const emailValue = 'test@example.com';
        const passwordValue = 'wrongpassword';
        const errorMessage = 'Invalid credentials';

        signInWithEmailAndPassword.mockRejectedValue(new Error(errorMessage));

        render(
            <MemoryRouter>
                <SignIn />
            </MemoryRouter>
        );

        const emailInput = screen.getByLabelText('Email:');
        const passwordInput = screen.getByLabelText('Password:');

        fireEvent.change(emailInput, { target: { value: emailValue } });
        fireEvent.change(passwordInput, { target: { value: passwordValue } });

        fireEvent.submit(emailInput.closest('form'));

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });

        expect(logUserError).toHaveBeenCalledWith({
            type: 'sign_in',
            email: emailValue,
            error: expect.any(Error),
        });
    });
});
