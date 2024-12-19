import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';




const getBlogCategories = async () => {
    const response = await axios.get(`${base_url}/blog-category/all-categories`)

    return response.data;
}

const createBlogCategory = async (blogCategory) => {
    const response = await axios.post(`${base_url}/blog-category/`, blogCategory, config)

    return response.data;
}

const updateCurrBlogCategory = async (blogCategory) => {

    const response = await axios.put(`${base_url}/blog-category/${blogCategory.id}`, { title: blogCategory.blogCategoryData.title }, config)

    return response.data;
}

const getCurrBlogCategory = async (id) => {
    const response = await axios.get(`${base_url}/blog-category/${id}`, config)
    return response.data;

}

const deleteCurrBlogCategory = async (id) => {
    const response = await axios.delete(`${base_url}/blog-category/${id}`, config)
    return response.data;

}

const blogCategoryService = {
    getBlogCategories,
    createBlogCategory,
    updateCurrBlogCategory,
    getCurrBlogCategory,
    deleteCurrBlogCategory
}

export default blogCategoryService;