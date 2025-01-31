import { useEffect, useState } from "react";

const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add("dark-mode");
            document.documentElement.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark-mode");
            document.documentElement.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    return (
        <button
            onClick={() => setIsDarkMode((prev) => !prev)}
            className={`btn ${isDarkMode ? "btn-light" : "btn-dark"}`}
        >
            {isDarkMode ? "☀️" : "🌙"}
        </button>
    );
};

export default DarkModeToggle;
