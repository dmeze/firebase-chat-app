import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home.jsx';
import ChatRoomList from "./components/ChatRoomList.jsx";
import ChatRoom from "./components/ChatRoom.jsx";

const App = () => {
    return (
        <Router>
            <div className="flex h-screen">
                <aside className="w-64 bg-gray-100 p-2 border-r border-gray-300">
                    <ChatRoomList />
                </aside>
                <main className="flex-1 p-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/chat/:roomId" element={<ChatRoom />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
