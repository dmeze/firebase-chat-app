import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import { HOME_PATH, CHAT_PATH, SIGN_IN_PATH, SIGN_UP_PATH } from '@/lib/constants.js';

import App from '../App';

vi.mock('../pages/Home.jsx', () => ({
    default: () => <div data-testid="home-page">Home Page</div>,
}));

vi.mock('../pages/ChatRoom.jsx', () => ({
    default: () => <div data-testid="chatroom-page">Chat Room Page</div>,
}));

vi.mock('../pages/SignIn.jsx', () => ({
    default: () => <div data-testid="signin-page">Sign In Page</div>,
}));

vi.mock('../pages/SignUp.jsx', () => ({
    default: () => <div data-testid="signup-page">Sign Up Page</div>,
}));

vi.mock('../components/auth/UserField.jsx', () => ({
    default: () => <div data-testid="user-field">User Field</div>,
}));

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        BrowserRouter: ({ children }) => <>{children}</>,
    };
});

describe('App', () => {
    it('renders ChatRoomList and UserField in the aside', async () => {
        render(
            <MemoryRouter initialEntries={[HOME_PATH]}>
                <App />
            </MemoryRouter>
        );

        expect(await screen.findByTestId('user-field')).toBeInTheDocument();
    });

    it('renders Home page when route is HOME_PATH', async () => {
        render(
            <MemoryRouter initialEntries={[HOME_PATH]}>
                <App />
            </MemoryRouter>
        );

        expect(await screen.findByTestId('home-page')).toBeInTheDocument();
    });

    it('renders ChatRoom page when route is CHAT_PATH', async () => {
        render(
            <MemoryRouter initialEntries={[CHAT_PATH]}>
                <App />
            </MemoryRouter>
        );

        expect(await screen.findByTestId('chatroom-page')).toBeInTheDocument();
    });

    it('renders SignIn page when route is SIGN_IN_PATH', async () => {
        render(
            <MemoryRouter initialEntries={[SIGN_IN_PATH]}>
                <App />
            </MemoryRouter>
        );

        expect(await screen.findByTestId('signin-page')).toBeInTheDocument();
    });

    it('renders SignUp page when route is SIGN_UP_PATH', async () => {
        render(
            <MemoryRouter initialEntries={[SIGN_UP_PATH]}>
                <App />
            </MemoryRouter>
        );

        expect(await screen.findByTestId('signup-page')).toBeInTheDocument();
    });
});
