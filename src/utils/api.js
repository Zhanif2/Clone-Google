import axios from "axios";

const BASE_URL = "https://www.googleapis.com/customsearch/v1";

const params = {
 // key: "AIzaSyBu_nRmQjTEllTbVPNUbR1MhevvS6w0-dI",
  //cx: "c7b3da0a8446b471e",
};

export const fetchDataFromApi = async (payload) => {
  const { data } = await axios.get(BASE_URL, {
    params: { ...params, ...payload },
  });
  return data;
};
