import { useParams } from 'react-router-dom';

import MessageList from "./MessageList.jsx";
import MessageInput from "./MessageInput.jsx";
import { useFirestoreMessages } from "../hooks/useFirestoreMessages.js";

const ChatRoom = () => {
    const { roomId } = useParams();

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
            <MessageInput user={{ username: 'Test' }} />
        </div>
    );
};

export default ChatRoom;
