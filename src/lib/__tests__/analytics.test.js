import { describe, it, beforeEach, vi } from 'vitest';
import { logEvent } from "firebase/analytics";

import { logUserEvent, logUserError } from '@/lib/analytics.js';
import { analytics } from "@/lib/firebase.js";

vi.mock("firebase/analytics");
vi.mock("@/lib/firebase.js");

describe('@/lib/analytics', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('logs user event with correct parameters', () => {
        const eventName = 'test_event';
        const eventParams = { param1: 'value1' };

        logUserEvent(eventName, eventParams);

        expect(logEvent).toHaveBeenCalledWith(analytics, eventName, eventParams);
    });

    it('logs user error with correct parameters', () => {
        const eventParams = { error: 'test_error' };

        logUserError(eventParams);

        expect(logEvent).toHaveBeenCalledWith(analytics, 'error', eventParams);
    });
});