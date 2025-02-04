import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ChatRoomList from "./components/chat/ChatRoomList.jsx";
import { AuthProvider } from "./components/auth/AuthContext.jsx";
import { CHAT_PATH, HOME_PATH, SIGN_IN_PATH, SIGN_UP_PATH } from "./lib/constants.js";

const Home = lazy(() => import("./pages/Home.jsx"));
const ChatRoom = lazy(() => import("./pages/ChatRoom.jsx"));
const SignIn = lazy(() => import("./pages/SignIn.jsx"));
const SignUp = lazy(() => import("./pages/SignUp.jsx"));
const UserField = lazy(() => import("./components/auth/UserField.jsx"));

const App = () => (
    <AuthProvider>
        <Router>
            <div className="flex flex-col md:flex-row h-screen">
                <aside className="w-full md:w-64 bg-gray-100 p-2 border-b md:border-b-0 md:border-r border-gray-300 flex flex-col">
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
