import useUserData from "@/lib/hooks/useFirestoreUsers.js";

const MessageItem = ({ message }) => {
    const userData = useUserData(message.userId);

    return (
        <div className="mb-4 flex items-center">
            {userData && userData.userIcon ? (
                <img
                    src={userData.userIcon}
                    alt="Profile Icon"
                    className="w-12 h-12 mr-3 rounded-full object-cover"
                />
            ) : (
                <div className="w-12 h-12 rounded-full bg-gray-400 mr-3"></div>
            )}
            <div>
                <strong className="block">{userData ? userData.username : "User"}</strong>
                <p>{message.text}</p>
            </div>
        </div>
    );
};

export default MessageItem;
