import axios from 'axios';
import { base_url, config } from '../../utils/axiosConfig';


const getBlogs = async () => {
    const response = await axios.get(`${base_url}/blog/all-blogs`);
    if (response.data) {
        return response.data;
    }
}

const getCurrentBlog = async (id) => {
    const response = await axios.get(`${base_url}/blog/${id}`);
    if (response.data) {
        return response.data;
    }
}


export const blogService = {
    getBlogs,
    getCurrentBlog,
}