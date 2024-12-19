import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("customer"))
    // console.log(getTokenFromLocalStorage.data.accessToken);
    return getTokenFromLocalStorage?.data?.accessToken !== undefined ? children : (<Navigate to="/login" replace={true} />)
}