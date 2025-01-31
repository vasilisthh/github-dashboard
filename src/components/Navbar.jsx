import { Link, useSearchParams } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
    const [searchParams] = useSearchParams();
    const username = searchParams.get("username") || "vasilisthh";

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">
                    GitHub Dashboard
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to={`/?username=${username}`}>Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`/repos?username=${username}`}>Repositories</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`/followers?username=${username}`}>Followers</Link>
                        </li>
                    </ul>

                    <div className="ms-3">
                        <DarkModeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
