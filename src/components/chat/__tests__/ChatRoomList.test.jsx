import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it } from 'vitest';

import ChatRoomList from '@/components/chat/ChatRoomList.jsx';

describe("@/components/chat/ChatRoomList", () => {
    it("renders the chat room list with correct titles", () => {
        render(
            <BrowserRouter>
                <ChatRoomList />
            </BrowserRouter>
        );
        expect(screen.getByText("Chat Rooms")).toBeInTheDocument();
        expect(screen.getByText("General")).toBeInTheDocument();
        expect(screen.getByText("Sports")).toBeInTheDocument();
        expect(screen.getByText("Technology")).toBeInTheDocument();
    });

    it("applies inactive class to the inactive chat room links", () => {
        render(
            <BrowserRouter initialEntries={['/chat/general']}>
                <ChatRoomList />
            </BrowserRouter>
        );
        expect(screen.getByText("Sports").closest('a')).toHaveClass('bg-gray-200 text-gray-800');
        expect(screen.getByText("Technology").closest('a')).toHaveClass('bg-gray-200 text-gray-800');
    });

    it("applies hover class to the chat room links on hover", () => {
        render(
            <BrowserRouter>
                <ChatRoomList />
            </BrowserRouter>
        );
        const sportsLink = screen.getByText("Sports").closest('a');
        sportsLink.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        expect(sportsLink).toHaveClass('hover:bg-gray-300');
    });
});