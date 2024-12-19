import axios from 'axios';
import { base_url, config } from '../../utils/axiosConfig';


const getProducts = async (data) => {
    try {
        const response = await axios.get(`${base_url}/product/all-products?${data?.newBrands ? `brand=${data?.newBrands}&&` : ""}${data?.newTags ? `tags=${data?.newTags}&&` : ""}${data?.newCategories ? `productCategory=${data?.newCategories}&&` : ""}${data?.minPrice ? `price[gte]=${data?.minPrice}&&` : ""}${data?.maxPrice
            ? `price[lte]=${data?.maxPrice}&&` : ""}${data?.sort ? `sort=${data?.sort}&&` : ""}`);
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error("Error fetching products: ", error);
        throw error;
    }
}

const getSingleProduct = async (id) => {
    try {
        const response = await axios.get(`${base_url}/product/${id}`);
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error("Error fetching single product: ", error);
        throw error;
    }
}

const addToWishlist = async (productId) => {
    try {
        const response = await axios.put(`${base_url}/product/wishlist`, { productId }, config);
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error("Error adding product to wishlist: ", error);
        throw error;
    }
}

const rateProduct = async (data) => {
    try {
        const response = await axios.put(`${base_url}/product/ratings`, data, config);
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error("Error rating product: ", error);
        throw error;
    }
}

export const productService = {
    getProducts,
    addToWishlist,
    getSingleProduct,
    rateProduct,
}