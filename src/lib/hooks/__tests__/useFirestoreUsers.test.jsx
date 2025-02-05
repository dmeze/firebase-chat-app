import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, beforeEach, vi } from 'vitest';
import { onSnapshot } from 'firebase/firestore';

import { logUserError } from '@/lib/analytics.js';

import useFirestoreUsers from '../useFirestoreUsers';

const TestComponent = () => {
    const { users, loading, error } = useFirestoreUsers();
    return (
        <div>
            {loading && <div data-testid="loading">Loading</div>}
            {error && <div data-testid="error">Error: {error.message}</div>}
            {Object.entries(users).map(([id, user]) => (
                <div key={id} data-testid="user">{user.username}</div>
            ))}
        </div>
    );
};

vi.mock('firebase/firestore', () => ({
    collection: vi.fn(),
    onSnapshot: vi.fn(),
    getFirestore: vi.fn()
}));

vi.mock('@/lib/analytics.js', () => ({
    logUserError: vi.fn(),
}));

describe('@/lib/hooks/useFirestoreUsers', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('returns users and sets loading to false on successful snapshot', async () => {
        const fakeSnapshot = {
            forEach: (callback) => {
                callback({ id: '1', data: () => ({ username: 'User1' }) });
                callback({ id: '2', data: () => ({ username: 'User2' }) });
            },
        };

        onSnapshot.mockImplementation((q, onSuccess) => {
            onSuccess(fakeSnapshot);
            return () => {};
        });

        render(<TestComponent />);

        await waitFor(() => {
            expect(screen.queryByTestId('loading')).toBeNull();
        });

        const userItems = screen.getAllByTestId('user');
        expect(userItems).toHaveLength(2);
        expect(screen.getByText('User1')).toBeInTheDocument();
        expect(screen.getByText('User2')).toBeInTheDocument();
    });

    it('sets error and calls logUserError on snapshot error', async () => {
        const fakeError = new Error('Snapshot error');

        onSnapshot.mockImplementation((q, onSuccess, onError) => {
            onError(fakeError);
            return () => {};
        });

        render(<TestComponent />);

        await waitFor(() => {
            expect(screen.queryByTestId('loading')).toBeNull();
        });

        const errorElement = screen.getByTestId('error');
        expect(errorElement).toHaveTextContent('Error: Snapshot error');
        expect(logUserError).toHaveBeenCalledWith({ type: 'useFirestoreUsers', error: 'Snapshot error' });
    });

    it('returns empty users and sets loading to false if no users are found', async () => {
        const fakeSnapshot = {
            forEach: () => {}
        };

        onSnapshot.mockImplementation((q, onSuccess) => {
            onSuccess(fakeSnapshot);
            return () => {};
        });

        render(<TestComponent />);

        await waitFor(() => {
            expect(screen.queryByTestId('loading')).toBeNull();
        });

        expect(screen.queryByTestId('user')).toBeNull();
    });
});