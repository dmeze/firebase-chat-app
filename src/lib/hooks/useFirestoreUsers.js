import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";

import { logUserError } from "@/lib/analytics.js";

import { db } from "../firebase";

const useFirestoreUsers = () => {
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const usersRef = collection(db, "users");

        const unsubscribe = onSnapshot(
            usersRef,
            (snapshot) => {
                const usersData = {};
                snapshot.forEach((doc) => {
                    usersData[doc.id] = doc.data();
                });
                setUsers(usersData);
                setLoading(false)
            },
            (err) => {
                logUserError({ type: "useFirestoreUsers", error: err.message });
                setError(err)
                setLoading(false)
            }
        );

        return () => unsubscribe();
    }, []);

    return { loading, users, error };
};

export default useFirestoreUsers;
