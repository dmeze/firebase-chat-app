import { NavLink } from 'react-router-dom';

const rooms = [
    { id: 'general', name: 'General' },
    { id: 'sports', name: 'Sports' },
    { id: 'tech', name: 'Technology' },
];

const ChatRoomList = () => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Chat Rooms</h2>
            <ul className="space-y-2">
                {rooms.map((room) => (
                    <li key={room.id}>
                        <NavLink
                            to={`/chat/${room.id}`}
                            className={({ isActive }) =>
                                `block p-2 rounded-xl transition ${
                                    isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                }`
                            }
                        >
                            {room.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ChatRoomList;
