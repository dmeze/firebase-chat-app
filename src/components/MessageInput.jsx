import { useState } from 'react';
import { useParams } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { db } from "../../firebase";

const MessageInput = ({ user }) => {
    const { roomId } = useParams();
    const [message, setMessage] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        try {
            await addDoc(collection(db, "chatRooms", roomId, "messages"), {
                text: message,
                username: user.username,
                profilePicture: user.profilePicture || "",
                timestamp: serverTimestamp(),
            });
        } catch (error) {
            console.error("Error sending message:", error);
        }
        setMessage("");
    };

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
                className="px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700 focus:outline-none"
            >
                Send
            </button>
        </form>
    );
}

export default MessageInput;
