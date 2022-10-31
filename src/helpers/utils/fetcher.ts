import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const fetcher = async (opts: AxiosRequestConfig) => {
  try {
    const response: AxiosResponse = await axios({ ...opts });
    return response.data;
  } catch (error: unknown) {
    console.log("API Error", error);
    throw error;
  }
};
export default fetcher;
