import { vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { logEvent } from 'firebase/analytics';
import { MemoryRouter } from 'react-router-dom';

import { logUserError } from '@/lib/analytics.js';
import { HOME_PATH, SIGN_IN_PATH } from '@/lib/constants.js';
import { SIGN_IN_LABEL, signUpFields } from '@/components/auth/constants.js';
import { auth, db } from '@/lib/firebase.js';

import SignUp from '../SignUp';

vi.mock('firebase/auth', () => ({
    signInWithEmailAndPassword: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    getAuth: vi.fn()
}));

vi.mock('firebase/analytics', () => ({
    logEvent: vi.fn(),
    analytics: {},
    getAnalytics: vi.fn()
}));

vi.mock('firebase/firestore', () => ({
    doc: vi.fn(),
    setDoc: vi.fn(),
    getFirestore: vi.fn()
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

describe('@pages/SignUp', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the sign up form with all fields and sign in link', () => {
        render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
        );

        expect(screen.getByTestId('signup-button')).toBeInTheDocument();

        signUpFields.forEach((field) => {
            expect(screen.getByLabelText(`${field.label}:`)).toBeInTheDocument();
        });

        const signInLink = screen.getByText(SIGN_IN_LABEL);
        expect(signInLink).toBeInTheDocument();
        expect(signInLink.closest('a')).toHaveAttribute('href', SIGN_IN_PATH);
    });

    it('calls createUserWithEmailAndPassword, logs event, writes user data, and navigates on successful sign up', async () => {
        const emailValue = 'newuser@example.com';
        const passwordValue = 'newpassword123';
        const usernameValue = 'NewUser';

        const fakeUser = { uid: 'user123', email: emailValue };

        createUserWithEmailAndPassword.mockResolvedValue({ user: fakeUser });

        doc.mockReturnValue('dummyDocRef');
        setDoc.mockResolvedValue();

        render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
        );

        const emailInput = screen.getByLabelText('Email:');
        const passwordInput = screen.getByLabelText('Password:');
        const usernameInput = screen.getByLabelText('Username:');

        fireEvent.change(emailInput, { target: { value: emailValue } });
        fireEvent.change(passwordInput, { target: { value: passwordValue } });
        fireEvent.change(usernameInput, { target: { value: usernameValue } });

        fireEvent.submit(emailInput.closest('form'));

        await waitFor(() => {
            expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, emailValue, passwordValue);
        });

        expect(logEvent).toHaveBeenCalledWith(undefined, 'register', { method: 'email', email: emailValue });
        expect(doc).toHaveBeenCalledWith(db, "users", fakeUser.uid);
        expect(setDoc).toHaveBeenCalledWith('dummyDocRef', { email: fakeUser.email, username: usernameValue, userIcon: "" });
        expect(mockedNavigate).toHaveBeenCalledWith(HOME_PATH);
    });

    it('displays an error message and logs error on sign up failure', async () => {
        const emailValue = 'fail@example.com';
        const passwordValue = 'failpassword';
        const usernameValue = 'FailUser';
        const errorMessage = 'Sign up failed';

        createUserWithEmailAndPassword.mockRejectedValue(new Error(errorMessage));

        render(
            <MemoryRouter>
                <SignUp />
            </MemoryRouter>
        );

        const emailInput = screen.getByLabelText('Email:');
        const passwordInput = screen.getByLabelText('Password:');
        const usernameInput = screen.getByLabelText('Username:');

        fireEvent.change(emailInput, { target: { value: emailValue } });
        fireEvent.change(passwordInput, { target: { value: passwordValue } });
        fireEvent.change(usernameInput, { target: { value: usernameValue } });

        fireEvent.submit(emailInput.closest('form'));

        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });

        expect(logUserError).toHaveBeenCalledWith({
            type: 'sign_up',
            email: emailValue,
            error: expect.any(Error),
        });
    });
});
