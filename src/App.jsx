import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4 text-center text-red-400">Firebase Chat App</h1>
                <Routes>
                    <Route path="/" element={<>home</>} />
                    <Route path="/chat/:roomId" element={<>chat room</>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
