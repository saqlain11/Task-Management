import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const fetcher = async (opts: AxiosRequestConfig) => {
  try {
    const response: AxiosResponse = await axios({ ...opts });
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};
export default fetcher;
