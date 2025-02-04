import { useEffect } from "react";
import { useParams } from 'react-router-dom';

import { useFirestoreMessages } from "@/lib/hooks/useFirestoreMessages.js";
import { logUserEvent } from "@/lib/analytics.js";

import MessageList from "../messages/MessageList.jsx";
import MessageInput from "../messages/MessageInput.jsx";

const ChatRoom = () => {
    const { roomId } = useParams();

    useEffect(() => {
        logUserEvent("screen_view", {
            screen_name: `ChatRoom: ${roomId}`,
        });
    }, [roomId]);

    const { messages, error, loading } = useFirestoreMessages(roomId);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <p>Loading messages...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-full">
                <p>Error: {error.message}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <h2 className="text-2xl font-semibold mb-4">Chat Room: {roomId}</h2>
            <MessageList messages={messages} />
            <MessageInput />
        </div>
    );
};

export default ChatRoom;
