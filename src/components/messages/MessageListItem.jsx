import { useMemo } from "react";

import { AnonymousIcon } from "@/components/Icons/Icons.jsx";
import { DEFAULT_USER_NAME } from "@/components/auth/constants.js";

const MessageItem = ({ message, users }) => {
    const user = useMemo(() => users[message.userId], [users, message])

    return (
        <div className="mb-4 flex items-center">
            {user && user.userIcon ? (
                <img
                    src={user.userIcon}
                    alt="Profile Icon"
                    className="w-12 h-12 mr-3 rounded-full object-cover"
                />
            ) : (
                <div className="w-12 h-12 rounded-full bg-gray-400 mr-3 flex items-center justify-center">
                    <AnonymousIcon />
                </div>
            )}
            <div>
                <strong className="block">{user ? user.username : DEFAULT_USER_NAME}</strong>
                <p>{message.text}</p>
            </div>
        </div>
    );
};

export default MessageItem;
