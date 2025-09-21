import axios from "axios";
import { baseURL } from "./endpoints";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function postAPI(apiType, body) {
  try {
    const response = await api.post(apiType, body);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      throw error.response;
    } else {
      throw { message: "Network Error" };
    }
  }
}
