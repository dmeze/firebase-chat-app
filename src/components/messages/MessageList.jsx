import MessageItem from "./MessageListItem.jsx";

const MessageList = ({ messages, users }) => (
    <div className="h-96 overflow-y-scroll border border-gray-300 p-4 rounded mb-4">
        {messages.map((message) => (
            <MessageItem key={message.id} message={message} users={users} />
        ))}
    </div>
);

export default MessageList;
