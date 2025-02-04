import { useEffect } from "react";
import { useParams } from 'react-router-dom';

import { logUserEvent } from "@/lib/analytics.js";
import useFirestoreMessages from "@/lib/hooks/useFirestoreMessages.js";
import useFirestoreUsers from "@/lib/hooks/useFirestoreUsers.js";

import MessageList from "../components/messages/MessageList.jsx";
import MessageInput from "../components/messages/MessageInput.jsx";

const ChatRoom = () => {
    const { roomId } = useParams();

    useEffect(() => {
        logUserEvent("screen_view", {
            screen_name: `ChatRoom: ${roomId}`,
        });
    }, [roomId]);

    const { messages, error, loading } = useFirestoreMessages(roomId);
    const { users, error: usersError, loading: usersLoading } = useFirestoreUsers();

    if (loading || usersLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <p>Loading messages...</p>
            </div>
        );
    }

    if (error || usersError) {
        return (
            <div className="flex items-center justify-center h-full">
                <p>Error: {error.message || usersError.message}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <h2 className="text-2xl font-semibold mb-4">Chat Room: {roomId}</h2>
            <MessageList messages={messages} users={users} />
            <MessageInput />
        </div>
    );
};

export default ChatRoom;
