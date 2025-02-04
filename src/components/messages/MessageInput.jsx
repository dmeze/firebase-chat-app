import { useState } from 'react';
import { useParams } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { db } from "@/lib/firebase.js";
import { logUserError } from "@/lib/analytics.js";

import { useAuthContext } from "../auth/AuthContext.jsx";

const MessageInput = () => {
    const { roomId } = useParams();
    const { user } = useAuthContext();
    const [message, setMessage] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        try {
            await addDoc(collection(db, "chatRooms", roomId, "messages"), {
                text: message,
                userId: user.uid,
                timestamp: serverTimestamp(),
            });
        } catch (error) {
            logUserError({ type: 'send_message', message, roomId, error });
        }
        setMessage("");
    };

    if (!user) {
        return (
            <div className="flex justify-center items-center h-20 text-gray-600">
                Please log in to send messages.
            </div>
        );
    }

    return (
        <form onSubmit={sendMessage} className="flex">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
                type="submit"
                className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-r hover:bg-blue-700 focus:outline-none"
            >
                Send
            </button>
        </form>
    );
};

export default MessageInput;
