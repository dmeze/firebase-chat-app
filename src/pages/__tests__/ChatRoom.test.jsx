import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, beforeEach, vi } from 'vitest';
import { useParams } from 'react-router-dom';

import ChatRoom from '@/pages/ChatRoom';
import { logUserEvent } from '@/lib/analytics.js';
import useFirestoreMessages from '@/lib/hooks/useFirestoreMessages.js';
import useFirestoreUsers from '@/lib/hooks/useFirestoreUsers.js';
import { NO_MESSAGES_TEXT } from "@/pages/constants.js";

vi.mock('react-router-dom', () => ({
    useParams: vi.fn(),
}));

vi.mock('@/lib/analytics.js', () => ({
    logUserEvent: vi.fn(),
}));

vi.mock('@/lib/hooks/useFirestoreMessages.js', () => ({
    default: vi.fn(),
}));

vi.mock('@/lib/hooks/useFirestoreUsers.js', () => ({
    default: vi.fn(),
}));

describe('@/pages/ChatRoom', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        window.HTMLElement.prototype.scrollIntoView = vi.fn();
    });

    it('renders loading state when messages and users are loading', () => {
        useParams.mockReturnValue({ roomId: 'room1' });
        useFirestoreMessages.mockReturnValue({ messages: [], loading: true, error: null });
        useFirestoreUsers.mockReturnValue({ users: {}, loading: true, error: null });

        render(<ChatRoom />);

        expect(screen.getByText('Loading messages...')).toBeInTheDocument();
    });

    it('renders error state when there is an error loading messages', () => {
        useParams.mockReturnValue({ roomId: 'room1' });
        useFirestoreMessages.mockReturnValue({ messages: [], loading: false, error: new Error('Messages error') });
        useFirestoreUsers.mockReturnValue({ users: {}, loading: false, error: null });

        render(<ChatRoom />);

        expect(screen.getByText('Error: Messages error')).toBeInTheDocument();
    });

    it('renders error state when there is an error loading users', () => {
        useParams.mockReturnValue({ roomId: 'room1' });
        useFirestoreMessages.mockReturnValue({ messages: [], loading: false, error: null });
        useFirestoreUsers.mockReturnValue({ users: {}, loading: false, error: new Error('Users error') });

        render(<ChatRoom />);

        expect(screen.getByText('Error: Users error')).toBeInTheDocument();
    });

    it('renders chat room with messages and users', async () => {
        useParams.mockReturnValue({ roomId: 'room1' });
        useFirestoreMessages.mockReturnValue({ messages: [{ id: '1', text: 'Hello' }], loading: false, error: null });
        useFirestoreUsers.mockReturnValue({ users: { '1': { username: 'User1' } }, loading: false, error: null });

        render(<ChatRoom />);

        await waitFor(() => {
            expect(screen.getByText('Chat Room: room1')).toBeInTheDocument();
        });
        expect(screen.getByText('Hello')).toBeInTheDocument();
    });

    it('logs screen view event on mount', () => {
        useParams.mockReturnValue({ roomId: 'room1' });
        useFirestoreMessages.mockReturnValue({ messages: [], loading: false, error: null });
        useFirestoreUsers.mockReturnValue({ users: {}, loading: false, error: null });

        render(<ChatRoom />);

        expect(logUserEvent).toHaveBeenCalledWith('screen_view', { screen_name: 'Chat Room: room1' });
    });

    it('renders no messages text when there are no messages', async () => {
        useParams.mockReturnValue({ roomId: 'room1' });
        useFirestoreMessages.mockReturnValue({ messages: [], loading: false, error: null });
        useFirestoreUsers.mockReturnValue({ users: { '1': { username: 'User1' } }, loading: false, error: null });

        render(<ChatRoom />);

        await waitFor(() => {
            expect(screen.getByText(NO_MESSAGES_TEXT)).toBeInTheDocument();
        });
    });

    it('renders error state when both messages and users have errors', () => {
        useParams.mockReturnValue({ roomId: 'room1' });
        useFirestoreMessages.mockReturnValue({ messages: [], loading: false, error: new Error('Messages error') });
        useFirestoreUsers.mockReturnValue({ users: {}, loading: false, error: new Error('Users error') });

        render(<ChatRoom />);

        expect(screen.getByText('Error: Messages error')).toBeInTheDocument();
    });

    it('renders chat room title with roomId', async () => {
        useParams.mockReturnValue({ roomId: 'room1' });
        useFirestoreMessages.mockReturnValue({ messages: [{ id: '1', text: 'Hello' }], loading: false, error: null });
        useFirestoreUsers.mockReturnValue({ users: { '1': { username: 'User1' } }, loading: false, error: null });

        render(<ChatRoom />);

        await waitFor(() => {
            expect(screen.getByText('Chat Room: room1')).toBeInTheDocument();
        });
    });
});