import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Repositories from "./pages/Repositories";
import Followers from "./pages/Followers";
import SearchBar from "./components/SearchBar";
import Navbar from "./components/Navbar";

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container mt-4">
                <SearchBar />
                <Routes>
                    <Route path="/" element={<Profile />} />
                    <Route path="/repos" element={<Repositories />} />
                    <Route path="/followers" element={<Followers />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
