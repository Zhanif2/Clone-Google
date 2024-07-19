import axios from "axios";

const BASE_URL = "https://www.googleapis.com/customsearch/v1";

const params = {
    key: "AIzaSyBu_nRmQjTEllTbVPNUbR1MhevvS6w0-dI",
    cx: "c7b3da0a8446b471e",
};

const fetchDataFromApi = async (payload, retries = 3, delay = 1000) => {
    try {
        const { data } = await axios.get(BASE_URL, {
            params: { ...params, ...payload },
        });
        console.log("API Data:", data);
        return data;
    } catch (error) {
        if (retries > 0 && error.response && error.response.status === 429) {
            console.warn(`Rate limit exceeded. Retrying in ${delay}ms...`);
            await new Promise((resolve) => setTimeout(resolve, delay));
            return fetchDataFromApi(payload, retries - 1, delay * 2); // Exponential backoff
        } else {
            console.error("API Error:", error);
            throw error;
        }
    }
};

export { fetchDataFromApi };
