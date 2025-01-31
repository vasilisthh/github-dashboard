import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchRepositories } from "../services/githubAPI";
import Pagination from "../components/Pagination";

const Repositories = () => {
    const [searchParams] = useSearchParams();
    const username = searchParams.get("username") || "github";
    const [repos, setRepos] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState("stars");
    const [sortOrder, setSortOrder] = useState("desc");

    useEffect(() => {
        const getRepos = async () => {
            setLoading(true);
            setError(null);
            setRepos([]);

            const data = await fetchRepositories(username, "full_name", page);

            if (data.error) {
                setError(data.error);
            } else {
                setRepos(data);
                setTotalPages(Math.ceil(data.length / 10));
            }

            setLoading(false);
        };

        getRepos();
    }, [username, page]);

    const sortedRepos = [...repos].sort((a, b) => {
        let comparison = 0;

        if (sortBy === "stars") {
            comparison = b.stargazers_count - a.stargazers_count;
        } else if (sortBy === "forks") {
            comparison = b.forks_count - a.forks_count;
        } else if (sortBy === "updated") {
            comparison = new Date(b.updated_at) - new Date(a.updated_at);
        }

        return sortOrder === "asc" ? -comparison : comparison;
    });

    return (
        <div className="container mt-4">
            <h2 className="mb-3">{username}'s Repositories</h2>

            {/* Sorting Controls */}
            <div className="d-flex align-items-center gap-3 mb-3">
                <div>
                    <label htmlFor="sort" className="fw-bold me-2">Sort by:</label>
                    <select
                        id="sort"
                        className="form-select d-inline-block w-auto"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="stars">Stars</option>
                        <option value="forks">Forks</option>
                        <option value="updated">Last Updated</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="order" className="fw-bold me-2">Order:</label>
                    <select
                        id="order"
                        className="form-select d-inline-block w-auto"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                    </select>
                </div>
            </div>

            {loading && <p>Loading repositories...</p>}
            {error && <p className="text-danger">{error}</p>}
            {sortedRepos.length === 0 && !loading && <p>No repositories found.</p>}

            <ul className="list-group">
                {sortedRepos.map((repo) => (
                    <li key={repo.id} className="list-group-item">
                        <h5>{repo.name}</h5>
                        <p>{repo.description || "No description available"}</p>
                        <span>⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}</span>
                    </li>
                ))}
            </ul>

            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
    );
};

export default Repositories;
