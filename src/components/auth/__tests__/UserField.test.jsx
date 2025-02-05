import { render, screen, fireEvent } from '@testing-library/react';
import { signOut } from "firebase/auth";
import { describe, it, beforeEach, afterEach, vi } from 'vitest';

import UserField from "@/components/auth/UserField.jsx";
import { useAuthContext } from "@/components/auth/AuthContext.jsx";
import { auth } from "@/lib/firebase.js";
import { DEFAULT_USER_NAME } from "@/components/auth/constants.js";

vi.mock("firebase/auth");
vi.mock("@/components/auth/AuthContext.jsx");
vi.mock("@/lib/firebase.js");

describe("@/components/auth/UserField", () => {
    const setUser = vi.fn();
    const mockUser = { uid: "123", username: "TestUser" };

    beforeEach(() => {
        useAuthContext.mockReturnValue({ user: mockUser, setUser });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("renders profile icon upload and welcome message when user is authenticated", () => {
        render(<UserField />);
        expect(screen.getByText(`Welcome, ${mockUser.username}`)).toBeInTheDocument();
    });

    it("renders default username when user has no username", () => {
        useAuthContext.mockReturnValue({ user: { ...mockUser, username: null }, setUser });
        render(<UserField />);
        expect(screen.getByText(`Welcome, ${DEFAULT_USER_NAME}`)).toBeInTheDocument();
    });

    it("calls signOut and alerts error message on sign out failure", async () => {
        const error = new Error("Sign out failed");
        signOut.mockRejectedValue(error);
        window.alert = vi.fn();

        render(<UserField />);
        fireEvent.click(screen.getByTestId("logout-btn"));

        expect(signOut).toHaveBeenCalledWith(auth);
        await screen.findByText(`Welcome, ${mockUser.username}`); // Wait for async action
        expect(window.alert).toHaveBeenCalledWith(error.message);
    });
});