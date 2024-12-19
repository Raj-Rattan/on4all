import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from "../../utils/axiosConfig"


const uploadImage = async (data) => {
    const response = await axios.post(`${base_url}/upload/`, data, config)
    return response.data;
}

const deleteImage = async (id) => {
    const response = await axios.delete(`${base_url}/upload/delete-image/${id}`, config)
    return response.data;
}

const uploadService = {
    uploadImage,
    deleteImage,
}

export default uploadService;