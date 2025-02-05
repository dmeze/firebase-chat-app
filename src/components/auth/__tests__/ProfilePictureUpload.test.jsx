import { render, screen } from '@testing-library/react';
import { describe, it, beforeEach, vi } from 'vitest';

import ProfileIconUpload from "@/components/auth/ProfilePictureUpload.jsx";
import { UPLOAD_ICON_LABEL } from "@/components/auth/constants.js";

vi.mock("firebase/storage");
vi.mock("firebase/firestore");
vi.mock("@/lib/analytics.js");

describe("@/components/auth/ProfileIconUpload", () => {
    const mockUser = { uid: "123", userIcon: null };
    const setUser = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders upload icon when user has no profile icon", () => {
        render(<ProfileIconUpload user={mockUser} setUser={setUser} />);
        expect(screen.getByText(UPLOAD_ICON_LABEL)).toBeInTheDocument();
    });

    it("renders profile icon when user has a profile icon", () => {
        const userWithIcon = { ...mockUser, userIcon: "http://example.com/icon.png" };
        render(<ProfileIconUpload user={userWithIcon} setUser={setUser} />);
        expect(screen.getByAltText("Profile Icon")).toBeInTheDocument();
    });
});