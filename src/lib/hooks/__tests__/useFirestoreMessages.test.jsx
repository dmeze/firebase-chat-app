import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { onSnapshot } from 'firebase/firestore';

import { logUserError } from '@/lib/analytics.js';

import useFirestoreMessages from '../useFirestoreMessages';

const TestComponent = ({ roomId }) => {
    const { messages, loading, error } = useFirestoreMessages(roomId);
    return (
        <div>
            {loading && <div data-testid="loading">Loading</div>}
            {error && <div data-testid="error">Error: {error.message}</div>}
            {messages.map((msg) => (
                <div key={msg.id} data-testid="message">{msg.text}</div>
            ))}
        </div>
    );
};

vi.mock('firebase/firestore', () => ({
    collection: vi.fn(),
    query: vi.fn(),
    orderBy: vi.fn(),
    onSnapshot: vi.fn(),
    getFirestore: vi.fn()
}));

vi.mock('@/lib/analytics.js', () => ({
    logUserError: vi.fn(),
}));

describe('@/lib/hooks/useFirestoreMessages', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('returns messages and sets loading to false on successful snapshot', async () => {
        const fakeSnapshot = {
            docs: [
                { id: '1', data: () => ({ text: 'Hello' }) },
                { id: '2', data: () => ({ text: 'World' }) },
            ],
        };

        onSnapshot.mockImplementation((q, onSuccess) => {
            onSuccess(fakeSnapshot);
            return () => {};
        });

        render(<TestComponent roomId="room1" />);

        await waitFor(() => {
            expect(screen.queryByTestId('loading')).toBeNull();
        });

        const messageItems = screen.getAllByTestId('message');
        expect(messageItems).toHaveLength(2);
        expect(screen.getByText('Hello')).toBeInTheDocument();
        expect(screen.getByText('World')).toBeInTheDocument();
    });

    it('sets error and calls logUserError on snapshot error', async () => {
        const fakeError = new Error('Snapshot error');

        onSnapshot.mockImplementation((q, onSuccess, onError) => {
            onError(fakeError);
            return () => {};
        });

        render(<TestComponent roomId="room1" />);

        await waitFor(() => {
            expect(screen.queryByTestId('loading')).toBeNull();
        });

        const errorElement = screen.getByTestId('error');
        expect(errorElement).toHaveTextContent('Error: Snapshot error');
        expect(logUserError).toHaveBeenCalledWith({ type: 'useFirestoreMessages', roomId: 'room1', error: 'Snapshot error' });
    });

    it('does nothing when roomId is not provided', () => {
        render(<TestComponent roomId={null} />);

        expect(screen.getByTestId('loading')).toBeInTheDocument();
        expect(screen.queryByTestId('message')).toBeNull();
        expect(screen.queryByTestId('error')).toBeNull();
    });
});
