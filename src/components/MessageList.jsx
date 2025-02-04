const MessageList = ({ messages }) => {
    return (
        <div className="h-96 overflow-y-scroll border border-gray-300 p-4 rounded mb-4">
            {messages.map((message) => (
                <div key={message.id} className="mb-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-400 mr-3"></div>
                    <div>
                        <strong className="block">{message.username}</strong>
                        <p>{message.text}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MessageList;
