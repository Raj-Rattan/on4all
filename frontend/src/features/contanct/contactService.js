import axios from 'axios';
import { base_url, config } from '../../utils/axiosConfig';


const postQuery = async (contactData) => {
    try {
        const response = await axios.post(`${base_url}/enquiry`, contactData, config);
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error("Error fetching enquiries: ", error);
        throw error;
    }
}

export const contactService = {
    postQuery,
}