import { logEvent } from "firebase/analytics";

import { analytics } from "@/lib/firebase.js";

export const logUserEvent = (eventName, eventParams) => {
    logEvent(analytics, eventName, eventParams);
}

export const logUserError = (eventName, eventParams) => {
    logEvent(analytics, `Error: ${eventName}`, eventParams);
}
