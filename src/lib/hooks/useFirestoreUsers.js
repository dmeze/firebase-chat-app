import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";

import { logUserError } from "@/lib/analytics.js";

import { db } from "../firebase";

const useUserData = (userId) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (!userId) return;

        const fetchUserData = async () => {
            try {
                const docRef = doc(db, "users", userId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                }
            } catch (err) {
                logUserError({ type: "useUserData", userId, error: err.message });
            }
        };

        fetchUserData();
    }, [userId]);

    return userData;
};

export default useUserData;
