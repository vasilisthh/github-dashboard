import { Link } from "react-router-dom";

const UserCard = ({ avatar, name, username, location, bio, repoCount, followers }) => {
    return (
        <div className="card text-center shadow-sm">
            <img src={avatar} alt={username} className="card-img-top rounded-circle mx-auto mt-3" style={{ width: "100px", height: "100px" }} />
            <div className="card-body">
                <h5 className="card-title">{name || "No Name"}</h5>
                <p className="card-text text-muted">@{username}</p>
                {location && <p className="card-text">📍 {location}</p>}
                {bio && <p className="card-text">{bio}</p>}
                <p className="fw-bold">Repos: {repoCount} | Followers: {followers}</p>
                <Link to={`/?username=${username}`} className="btn btn-primary btn-sm">View Profile</Link>
            </div>
        </div>
    );
};

export default UserCard;
