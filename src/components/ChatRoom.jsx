import { useState } from 'react';
import { useParams } from 'react-router-dom';

import MessageList from "./MessageList.jsx";
import MessageInput from "./MessageInput.jsx";

const ChatRoom = () => {
    const { roomId } = useParams();
    const [messages, setMessages] = useState([
        {
            id: 1,
            username: 'John Doe',
            text: 'Hello, World!',
        },
        {
            id: 2,
            username: 'Jane Doe',
            text: 'Hi, there!',
        }
    ]);

    return (
        <div className="flex flex-col h-full">
            <h2 className="text-2xl font-semibold mb-4">Chat Room: {roomId}</h2>
            <MessageList messages={messages} />
            <MessageInput user={{ username: 'Test' }} setMessages={setMessages} />
        </div>
    );
}

export default ChatRoom;
