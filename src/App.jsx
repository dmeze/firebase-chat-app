import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ChatRoomList from "./components/chat/ChatRoomList.jsx";
import { AuthProvider } from "./components/auth/AuthContext.jsx";
import { CHAT_PATH, HOME_PATH, SIGN_IN_PATH, SIGN_UP_PATH } from "./lib/constants.js";

const Home = lazy(() => import("./components/Home.jsx"));
const ChatRoom = lazy(() => import("./components/chat/ChatRoom.jsx"));
const SignIn = lazy(() => import("./components/auth/SignIn.jsx"));
const SignUp = lazy(() => import("./components/auth/SignUp.jsx"));
const UserField = lazy(() => import("./components/auth/UserField.jsx"));

const App = () => (
    <AuthProvider>
        <Router>
            <div className="flex h-screen">
                <aside className="w-64 bg-gray-100 p-2 border-r border-gray-300 flex flex-col">
                    <ChatRoomList />
                    <Suspense fallback={<div>Loading...</div>}>
                        <UserField />
                    </Suspense>
                </aside>
                <main className="flex-1 p-4">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path={HOME_PATH} element={<Home />} />
                            <Route path={CHAT_PATH} element={<ChatRoom />} />
                            <Route path={SIGN_IN_PATH} element={<SignIn />} />
                            <Route path={SIGN_UP_PATH} element={<SignUp />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    </AuthProvider>
);

export default App;
