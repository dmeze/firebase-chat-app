import { logEvent } from "firebase/analytics";

import { analytics } from "@/lib/firebase.js";

export const logUserEvent = (eventName, eventParams) => {
    logEvent(analytics, eventName, eventParams);
}

export const logUserError = (eventParams) => {
    logEvent(analytics, 'error', eventParams);
}
