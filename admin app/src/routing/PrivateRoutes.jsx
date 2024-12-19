import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("user"))
    // console.log(getTokenFromLocalStorage.data.accessToken);
    return getTokenFromLocalStorage?.data?.accessToken !== undefined ? children : (<Navigate to="/" replace={true} />)
}