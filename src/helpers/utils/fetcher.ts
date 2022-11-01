import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const fetcher = async (opts: AxiosRequestConfig, full: boolean) => {
  try {
    const response: AxiosResponse = await axios({ ...opts });
    return full
      ? { data: response.data, count: response.headers["x-total-count"] }
      : response.data;
  } catch (error: unknown) {
    console.log("API Error", error);
    throw error;
  }
};
export default fetcher;
