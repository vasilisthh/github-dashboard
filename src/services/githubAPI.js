import axios from "axios";

const BASE_URL = "https://api.github.com/users/";

const handleApiError = (error) => {
    if (error.response) {
        if (error.response.status === 403 && error.response.headers["x-ratelimit-remaining"] === "0") {
            return { error: "GitHub API rate limit exceeded. Try again later." };
        } else if (error.response.status === 429) {
            return { error: "Too many requests! Slow down and try again later." };
        } else if (error.response.status === 404) {
            return { error: "User not found." };
        } else {
            return { error: `API Error: ${error.response.statusText}` };
        }
    } else {
        return { error: "Network error. Please check your connection." };
    }
};

export const fetchUserProfile = async (username) => {
    try {
        const response = await axios.get(`${BASE_URL}${username}`);
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const fetchRepositories = async (username, sort = "stars", page = 1) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
            params: { sort, per_page: 10, page },
        });

        if (!response.data || response.data.length === 0) {
            return { error: "No repositories found." };
        }

        return response.data;
    } catch (error) {
        return { error: error.response?.data?.message || "Error fetching repositories." };
    }
};

export const fetchFollowers = async (username, page = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}${username}/followers`, {
            params: { per_page: 10, page },
        });

        if (!Array.isArray(response.data) || response.data.length === 0) {
            return [];
        }

        return response.data;
    } catch (error) {
        return [];
    }
};

