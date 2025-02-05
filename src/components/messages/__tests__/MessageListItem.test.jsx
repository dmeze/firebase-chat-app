import { describe, it, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import MessageItem from '@/components/messages/MessageListItem.jsx';
import { DEFAULT_USER_NAME } from "@/components/auth/constants.js";

vi.mock("@/components/Icons/Icons.jsx", () => ({
    AnonymousIcon: () => <div>Anonymous Icon</div>,
}));

describe("@/components/messages/MessageListItem", () => {
    const mockUsers = {
        "1": { username: "User1", userIcon: "user1-icon.png" },
        "2": { username: "User2", userIcon: null }
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders user icon and username when user is found", () => {
        const message = { userId: "1", text: "Hello" };
        render(<MessageItem message={message} users={mockUsers} />);
        expect(screen.getByAltText("Profile Icon")).toBeInTheDocument();
        expect(screen.getByText("User1")).toBeInTheDocument();
        expect(screen.getByText("Hello")).toBeInTheDocument();
    });

    it("renders anonymous icon and default username when user is not found", () => {
        const message = { userId: "3", text: "Hello" };
        render(<MessageItem message={message} users={mockUsers} />);
        expect(screen.getByText("Anonymous Icon")).toBeInTheDocument();
        expect(screen.getByText(DEFAULT_USER_NAME)).toBeInTheDocument();
        expect(screen.getByText("Hello")).toBeInTheDocument();
    });

    it("renders anonymous icon and default username when user has no icon", () => {
        const message = { userId: "2", text: "Hello" };
        render(<MessageItem message={message} users={mockUsers} />);
        expect(screen.getByText("Anonymous Icon")).toBeInTheDocument();
        expect(screen.getByText("User2")).toBeInTheDocument();
        expect(screen.getByText("Hello")).toBeInTheDocument();
    });
});