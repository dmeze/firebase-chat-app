import { useState } from 'react';

const MessageInput = ({ user, setMessages }) => {
    const [message, setMessage] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        setMessages((messages) => [
            ...messages,
            {
                id: messages.length + 1,
                username: user.username,
                text: message,
            },
        ]);

        setMessage('');
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
