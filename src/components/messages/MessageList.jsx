import { useEffect, useRef } from "react";
import MessageItem from "./MessageListItem.jsx";

const MessageList = ({ messages, users }) => {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    return (
        <div className="h-[calc(100vh-450px)] md:h-[calc(100vh-100px)] overflow-y-scroll border border-gray-300 p-4 rounded mb-4">
            {messages.map((message) => (
                <MessageItem key={message.id} message={message} users={users}/>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
}

export default MessageList;
