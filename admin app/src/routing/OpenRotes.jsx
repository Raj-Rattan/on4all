import { Navigate } from "react-router-dom";

export const OpenRoutes = ({ children }) => {
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("user"))
    return getTokenFromLocalStorage?.data?.accessToken === undefined ? children : (<Navigate to="/admin" replace={true} />)
}