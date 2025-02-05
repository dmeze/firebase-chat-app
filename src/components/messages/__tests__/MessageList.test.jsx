import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import MessageList from '../MessageList';

vi.mock('../MessageListItem.jsx', () => ({
    default: ({ message }) => <div data-testid="message-item">{message.text}</div>,
}));

describe('@/components/messages/MessageList', () => {
    beforeEach(() => {
        Element.prototype.scrollIntoView = vi.fn();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders the correct number of messages and displays their text', () => {
        const messages = [
            { id: '1', text: 'Hello, world!' },
            { id: '2', text: 'Testing is fun!' },
        ];
        render(<MessageList messages={messages} users={[]} />);

        const items = screen.getAllByTestId('message-item');
        expect(items).toHaveLength(2);

        expect(screen.getByText('Hello, world!')).toBeInTheDocument();
        expect(screen.getByText('Testing is fun!')).toBeInTheDocument();
    });

    it('calls scrollIntoView when messages change', async () => {
        const { rerender } = render(<MessageList messages={[]} users={[]} />);
        vi.clearAllMocks();

        const messages = [
            { id: '1', text: 'Hello' },
            { id: '2', text: 'World' },
        ];
        rerender(<MessageList messages={messages} users={[]} />);

        await waitFor(() => {
            expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
        });
    });
});
