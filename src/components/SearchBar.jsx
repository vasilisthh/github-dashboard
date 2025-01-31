import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        setQuery(e.target.value);
        if (e.target.value.length < 3) {
            setResults([]);
            return;
        }

        try {
            const response = await axios.get(`https://api.github.com/search/users?q=${query}`);
            setResults(response.data.items);
        } catch (err) {
            setError("Failed to fetch users.");
        }
    };

    const handleSelectUser = (username) => {
        navigate(`/?username=${username}`);
        setQuery("");
        setResults([]);
    };

    return (
        <div className="position-relative w-100" style={{ maxWidth: "400px", margin: "0 auto" }}>
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search GitHub users..."
                className="form-control"
            />

            {results.length > 0 && (
                <ul className="list-group position-absolute w-100" style={{ zIndex: 1000, maxHeight: "200px", overflowY: "auto" }}>
                    {results.slice(0, 5).map((user) => (
                        <li
                            key={user.id}
                            onClick={() => handleSelectUser(user.login)}
                            className="list-group-item d-flex align-items-center gap-3 cursor-pointer"
                            style={{ cursor: "pointer" }}
                        >
                            <img
                                src={user.avatar_url}
                                alt={user.login}
                                className="rounded-circle"
                                style={{ width: "40px", height: "40px" }}
                            />
                            <span className="fw-bold">{user.login}</span>
                        </li>
                    ))}
                </ul>
            )}

            {error && <p className="text-danger mt-2">{error}</p>}
        </div>
    );
};

export default SearchBar;
