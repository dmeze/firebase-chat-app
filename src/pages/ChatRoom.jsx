import { useEffect } from "react";
import { useParams } from 'react-router-dom';

import { logUserEvent } from "@/lib/analytics.js";
import useFirestoreMessages from "@/lib/hooks/useFirestoreMessages.js";
import useFirestoreUsers from "@/lib/hooks/useFirestoreUsers.js";
import { CHAT_ROOM_TITLE, MESSAGES_LOADING_TEXT, NO_MESSAGES_TEXT } from "@/pages/constants.js";

import MessageList from "../components/messages/MessageList.jsx";
import MessageInput from "../components/messages/MessageInput.jsx";

const ChatRoom = () => {
    const { roomId } = useParams();

    useEffect(() => {
        logUserEvent("screen_view", {
            screen_name: `${CHAT_ROOM_TITLE} ${roomId}`,
        });
    }, [roomId]);

    const { messages, error, loading } = useFirestoreMessages(roomId);
    const { users, error: usersError, loading: usersLoading } = useFirestoreUsers();

    if (loading || usersLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <p>{MESSAGES_LOADING_TEXT}</p>
            </div>
        );
    }

    if (error || usersError) {
        return (
            <div className="flex items-center justify-center h-full">
                <p>Error: {error?.message || usersError?.message}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <h2 className="text-2xl font-semibold mb-4">{`${CHAT_ROOM_TITLE} ${roomId}`}</h2>
            {messages.length
                ? <MessageList messages={messages} users={users} />
                : <p>{NO_MESSAGES_TEXT}</p>
            }
            <MessageInput />
        </div>
    );
};

export default ChatRoom;
