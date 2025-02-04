import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.js";

export const useFirestoreMessages = (roomId) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!roomId) return;

        const messagesRef = collection(db, "chatRooms", roomId, "messages");
        const q = query(messagesRef, orderBy("timestamp"));

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setMessages(msgs);
                setLoading(false);
            },
            (err) => {
                setError(err);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [roomId]);

    return { messages, loading, error };
};
