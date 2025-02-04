import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home.jsx';
import ChatRoomList from "./components/ChatRoomList.jsx";
import ChatRoom from "./components/ChatRoom.jsx";
import { AuthProvider } from "./components/auth/AuthContext.jsx";
import UserField from "./components/auth/UserField.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import SignIn from "./components/auth/SignIn.jsx";
import { CHAT_PATH, HOME_PATH, SIGN_IN_PATH, SIGN_UP_PATH } from "./lib/constants.js";

const App = () => (
    <AuthProvider>
        <Router>
            <div className="flex h-screen">
                <aside className="w-64 bg-gray-100 p-2 border-r border-gray-300 flex flex-col">
                    <ChatRoomList />
                    <UserField />
                </aside>
                <main className="flex-1 p-4">
                    <Routes>
                        <Route path={HOME_PATH} element={<Home />} />
                        <Route path={CHAT_PATH} element={<ChatRoom />} />
                        <Route path={SIGN_IN_PATH} element={<SignIn />} />
                        <Route path={SIGN_UP_PATH} element={<SignUp />} />
                    </Routes>
                </main>
            </div>
        </Router>
    </AuthProvider>
);

export default App;
