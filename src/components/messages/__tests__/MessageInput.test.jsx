import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, beforeEach, afterEach, vi } from 'vitest';
import { useParams } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { useAuthContext } from "@/components/auth/AuthContext.jsx";
import MessageInput from "@/components/messages/MessageInput.jsx";
import { db } from "@/lib/firebase.js";
import { logUserError } from "@/lib/analytics.js";
import { NO_USER, SEND_BUTTON_TEXT, TYPE_MESSAGE_PLACEHOLDER } from "@/components/messages/constants.js";

vi.mock("react-router-dom", () => ({
    useParams: vi.fn(),
}));
vi.mock("firebase/firestore");
vi.mock("@/components/auth/AuthContext.jsx");
vi.mock("@/lib/firebase.js");
vi.mock("@/lib/analytics.js");

describe("@/components/messages/MessageInput", () => {
    const mockUser = { uid: "123" };

    beforeEach(() => {
        useParams.mockReturnValue({ roomId: "room1" });
        useAuthContext.mockReturnValue({ user: mockUser });
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("renders input and button when user is authenticated", () => {
        render(<MessageInput />);
        expect(screen.getByPlaceholderText(TYPE_MESSAGE_PLACEHOLDER)).toBeInTheDocument();
        expect(screen.getByText(SEND_BUTTON_TEXT)).toBeInTheDocument();
    });

    it("renders login prompt when user is not authenticated", () => {
        useAuthContext.mockReturnValue({ user: null });
        render(<MessageInput />);
        expect(screen.getByText(NO_USER)).toBeInTheDocument();
    });

    it("sends message on form submit", async () => {
        addDoc.mockResolvedValue({});
        render(<MessageInput />);
        fireEvent.change(screen.getByPlaceholderText(TYPE_MESSAGE_PLACEHOLDER), { target: { value: "Hello" } });
        fireEvent.click(screen.getByText(SEND_BUTTON_TEXT));
        expect(addDoc).toHaveBeenCalledWith(collection(db, "chatRooms", "room1", "messages"), {
            text: "Hello",
            userId: mockUser.uid,
            timestamp: serverTimestamp(),
        });
    });

    it("does not send empty message", async () => {
        render(<MessageInput />);
        fireEvent.change(screen.getByPlaceholderText(TYPE_MESSAGE_PLACEHOLDER), { target: { value: " " } });
        fireEvent.click(screen.getByText(SEND_BUTTON_TEXT));
        expect(addDoc).not.toHaveBeenCalled();
    });

    it("logs error on message send failure", async () => {
        const error = new Error("Send failed");
        addDoc.mockRejectedValue(error);
        render(<MessageInput />);
        await act(async () => {
            fireEvent.change(screen.getByPlaceholderText(TYPE_MESSAGE_PLACEHOLDER), { target: { value: "Hello" } });
            fireEvent.click(screen.getByText(SEND_BUTTON_TEXT));
        });

        expect(logUserError).toHaveBeenCalledWith({ type: 'send_message', message: "Hello", roomId: "room1", error });
    });
});