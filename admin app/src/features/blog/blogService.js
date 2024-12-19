import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';


const getBlogs = async () => {
    const response = await axios.get(`${base_url}/blog/all-blogs`)

    return response.data;
}

const createBlog = async (blog) => {
    const response = await axios.post(`${base_url}/blog/`, blog, config)

    return response.data;
}

const updateCurrentBlog = async (blog) => {
    const response = await axios.put(
        `${base_url}/blog/${blog.id}`,
        {
            title: blog.blogData.title,
            description: blog.blogData.description,
            category: blog.blogData.category,
            images: blog.blogData.images,
        },
        config
    )

    return response.data;
}

const getCurrentBlog = async (id) => {
    const response = await axios.get(`${base_url}/blog/${id}`, config)
    return response.data;

}

const deleteCurrentBlog = async (id) => {
    const response = await axios.delete(`${base_url}/blog/${id}`, config)
    return response.data;

}

const blogService = {
    getBlogs,
    createBlog,
    updateCurrentBlog,
    getCurrentBlog,
    deleteCurrentBlog
}

export default blogService;