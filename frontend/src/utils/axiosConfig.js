export const base_url = "http://localhost:5000/api/v1";

const getTokenFromLocalStorage = localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : null;

export const config = {
    headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage : ""}`,
        Accept: "application/json"
    }
}