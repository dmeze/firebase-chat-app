import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';

const App = () => {
    return (
        <Router>
            <div className="flex h-screen">
                <aside className="w-64 bg-gray-100 p-4 border-r border-gray-300">
                    Chat List Drawer
                </aside>
                <main className="flex-1 p-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/chat/:roomId" element={<>Chat Room</>} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
