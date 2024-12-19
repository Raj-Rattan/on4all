import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';



const getEnquiries = async () => {
    const response = await axios.get(`${base_url}/enquiry/all-enquiries`)

    return response.data;
}

const getCurrentEnquiry = async (id) => {
    const response = await axios.get(`${base_url}/enquiry/${id}`)

    return response.data;
}

const updateCurrentEnquiry = async (enquiry) => {
    const response = await axios.put(`${base_url}/enquiry/${enquiry.id}`, { status: enquiry.enquiryData }, config)

    return response.data;
}

const deleteCurrentEnquiry = async (id) => {
    const response = await axios.delete(`${base_url}/enquiry/${id}`, config)

    return response.data;
}

const enquiryService = {
    getEnquiries,
    deleteCurrentEnquiry,
    getCurrentEnquiry,
    updateCurrentEnquiry
}

export default enquiryService;