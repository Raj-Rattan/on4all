import { Navigate } from "react-router-dom";

export const OpenRoutes = ({ children }) => {
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("customer"))
    return getTokenFromLocalStorage?.data?.accessToken === undefined ? children : (<Navigate to="/" replace={true} />)
}