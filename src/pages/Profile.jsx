import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchUserProfile } from "../services/githubAPI";
import UserCard from "../components/UserCard";

const Profile = () => {
    const [searchParams] = useSearchParams();
    const username = searchParams.get("username") || "vasilisthh";
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            setError(null);
            const data = await fetchUserProfile(username);

            if (data.error) {
                setError(data.error);
            } else {
                setUser(data);
            }

            setLoading(false);
        };

        getUser();
    }, [username]);

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return user ? (
        <div className="d-flex justify-content-center mt-4">
            <UserCard
                avatar={user.avatar_url}
                name={user.name}
                username={user.login}
                location={user.location}
                bio={user.bio}
                repoCount={user.public_repos}
                followers={user.followers}
            />
        </div>
    ) : null;
};

export default Profile;
