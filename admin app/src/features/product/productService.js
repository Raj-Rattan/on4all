import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';



const getProducts = async () => {
    const response = await axios.get(`${base_url}/product/all-products`)

    return response.data;
}

const createProduct = async (product) => {
    const response = await axios.post(`${base_url}/product/`, product, config)

    return response.data;
}

const getCurrentProduct = async (id) => {
    const response = await axios.get(`${base_url}/product/${id}`, config)

    return response.data;
}

const updateCurrentProduct = async (product) => {
    const response = await axios.put(
        `${base_url}/product/${product.id}`,
        {
            title: product.productData.title,
            description: product.productData.description,
            productCategory: product.productData.productCategory,
            price: product.productData.price,
            brand: product.productData.brand,
            tags: product.productData.tags,
            color: product.productData.color,
            quantity: product.productData.quantity,
            images: product.productData.images,
        },
        config
    )

    return response.data;
}

const deleteCurrentProduct = async (id) => {
    const response = await axios.delete(`${base_url}/product/${id}`, config)
    return response.data;

}

const productService = {
    getProducts,
    createProduct,
    getCurrentProduct,
    updateCurrentProduct,
    deleteCurrentProduct
}

export default productService;