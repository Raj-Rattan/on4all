import axios from 'axios';
import { base_url, config } from '../../utils/axiosConfig';

const register = async (userData) => {
    const response = await axios.post(`${base_url}/user/register`, userData);
    if (response.data) {
        return response.data;
    }
}

const login = async (userData) => {
    const response = await axios.post(`${base_url}/user/login`, userData);
    if (response.data) {
        if (response.data) {
            localStorage.setItem("customer", JSON.stringify(response.data));
        }
        return response.data;
    }
}

const getUserWishlist = async () => {
    const response = await axios.get(`${base_url}/user/wishlist`, config);
    if (response.data) {
        return response.data;
    }
}

const addToCart = async (cartData) => {
    const response = await axios.post(`${base_url}/user/add-to-cart`, cartData, config);
    if (response.data) {
        return response.data;
    }
}

const getCart = async () => {
    const response = await axios.get(`${base_url}/user/get-cart`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            Accept: 'application/json',
        },
    });
    if (response.data) {
        return response.data;
    }
}

const removeProductFromCart = async (cartItemId) => {
    const response = await axios.delete(`${base_url}/user/delete-product-cart/${cartItemId}`, config);
    if (response.data) {
        return response.data;
    }
}

const updateProductFromCart = async (cartDetail) => {
    const response = await axios.put(`${base_url}/user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`, "", config);
    if (response.data) {
        return response.data;
    }
}

const createOrder = async (orderDetail) => {
    const response = await axios.post(`${base_url}/user/add-to-cart/create-order`, orderDetail, config);
    if (response.data) {
        return response.data;
    }
}

const getUserOrders = async () => {
    const response = await axios.get(`${base_url}/user/getMyOrders`, config);
    if (response.data) {
        return response.data;
    }
}

const updateUser = async (data) => {
    const response = await axios.put(`${base_url}/user/update-account`, data.data, data.config2);
    if (response.data) {
        return response.data;
    }
}

const forgotPassToken = async (data) => {
    const response = await axios.post(`${base_url}/user/forgot-password-token`, data, config);
    if (response.data) {
        return response.data;
    }
}

const resetPass = async (data) => {
    const response = await axios.put(`${base_url}/user/update-password/${data.accessToken}`, data, config);
    if (response.data) {
        return response.data;
    }
}

const emptyCart = async () => {
    const response = await axios.delete(`${base_url}/user/empty-cart`, config);
    if (response.data) {
        return response.data;
    }
}

export const authService = {
    register,
    login,
    getUserWishlist,
    addToCart,
    getCart,
    removeProductFromCart,
    updateProductFromCart,
    createOrder,
    getUserOrders,
    updateUser,
    forgotPassToken,
    resetPass,
    emptyCart,
}