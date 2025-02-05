import { describe, it, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { onAuthStateChanged } from "firebase/auth";
import { getDoc } from "firebase/firestore";

import { AuthProvider, useAuthContext } from "@/components/auth/AuthContext.jsx";

vi.mock("firebase/auth");
vi.mock("firebase/firestore");
vi.mock("@/lib/firebase.js");

describe("@/components/auth/AuthProvider", () => {
    const mockUser = { uid: "123", email: "test@example.com" };
    const mockUserDoc = { exists: () => true, data: () => ({ displayName: "Test User" }) };

    beforeEach(() => {
        onAuthStateChanged.mockImplementation((auth, callback) => {
            callback(mockUser);
            return () => {};
        });
        getDoc.mockResolvedValue(mockUserDoc);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("provides user data when authenticated", async () => {
        const TestComponent = () => {
            const { user } = useAuthContext();
            return <div>{user ? user.displayName : "No User"}</div>;
        };

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        expect(await screen.findByText("Test User")).toBeInTheDocument();
    });

    it("provides null user when not authenticated", async () => {
        onAuthStateChanged.mockImplementation((auth, callback) => {
            callback(null);
            return () => {};
        });

        const TestComponent = () => {
            const { user } = useAuthContext();
            return <div>{user ? user.displayName : "No User"}</div>;
        };

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        expect(await screen.findByText("No User")).toBeInTheDocument();
    });

    it("sets error state on authentication error", async () => {
        const error = new Error("Auth error");
        onAuthStateChanged.mockImplementation((auth, callback, errorCallback) => {
            errorCallback(error);
            return () => {};
        });

        const TestComponent = () => {
            const { error } = useAuthContext();
            return <div>{error ? error.message : "No Error"}</div>;
        };

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        expect(await screen.findByText("Auth error")).toBeInTheDocument();
    });

    it("sets error state on Firestore error", async () => {
        const error = new Error("Firestore error");
        getDoc.mockRejectedValue(error);

        const TestComponent = () => {
            const { error } = useAuthContext();
            return <div>{error ? error.message : "No Error"}</div>;
        };

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        expect(await screen.findByText("Firestore error")).toBeInTheDocument();
    });
});