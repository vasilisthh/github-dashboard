import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchFollowers } from "../services/githubAPI";
import Pagination from "../components/Pagination";

const Followers = () => {
    const [searchParams] = useSearchParams();
    const username = searchParams.get("username") || "github";
    const [followers, setFollowers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getFollowers = async () => {
            setLoading(true);
            setError(null);
            setFollowers([]);

            const data = await fetchFollowers(username, page);

            if (!Array.isArray(data) || data.length === 0) {
                setError("No followers found.");
            } else {
                setFollowers(data);
                setTotalPages(50);
            }

            setLoading(false);
        };

        getFollowers();
    }, [username, page]);

    return (
        <div className="container mt-4">
            <h2 className="mb-3">{username}'s Followers</h2>

            {loading && <p>Loading followers...</p>}
            {error && <p className="text-danger">{error}</p>}

            {followers.length > 0 && (
                <ul className="list-group">
                    {followers.map((follower) => (
                        <li key={follower.id} className="list-group-item d-flex align-items-center gap-3">
                            <img
                                src={follower.avatar_url}
                                alt={follower.login}
                                className="rounded-circle"
                                style={{ width: "50px", height: "50px" }}
                            />
                            <span className="fw-bold">{follower.login}</span>
                        </li>
                    ))}
                </ul>
            )}

            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
    );
};

export default Followers;
