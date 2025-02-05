import { describe, it, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { signInAnonymously } from "firebase/auth";

import { useAuthContext } from "@/components/auth/AuthContext.jsx";
import AnonymousSignInButton from "@/components/auth/AnonymousSignInButton.jsx";
import { ANONYMOUS_LABEL } from "@/components/auth/constants.js";
import { logUserError } from "@/lib/analytics.js";

vi.mock("firebase/auth");
vi.mock("@/components/auth/AuthContext.jsx");
vi.mock("@/lib/analytics.js");

describe("@/components/auth/AnonymousSignInButton", () => {
    const setUser = vi.fn();

    beforeEach(() => {
        useAuthContext.mockReturnValue({ setUser });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("renders the button with correct label", () => {
        render(<AnonymousSignInButton />);
        expect(screen.getByText(ANONYMOUS_LABEL)).toBeInTheDocument();
    });

    it("calls signInAnonymously and sets user on successful sign-in", async () => {
        const user = { uid: "123" };
        signInAnonymously.mockResolvedValue({ user });

        render(<AnonymousSignInButton />);
        fireEvent.click(screen.getByText(ANONYMOUS_LABEL));

        expect(signInAnonymously).toHaveBeenCalled();
        await screen.findByText(ANONYMOUS_LABEL);
        expect(setUser).toHaveBeenCalledWith(user);
    });

    it("logs error on sign-in failure", async () => {
        const error = new Error("Sign-in failed");
        signInAnonymously.mockRejectedValue(error);

        render(<AnonymousSignInButton />);
        fireEvent.click(screen.getByText(ANONYMOUS_LABEL));

        await screen.findByText(ANONYMOUS_LABEL);
        expect(logUserError).toHaveBeenCalledWith({ type: 'signInAnonymously', message: error.message });
    });
});