import fetcher from "./fetcher";
import axios, { AxiosStatic } from "axios";
import { API_MESSAGES } from "helpers/constants";

jest.mock("axios");

interface AxiosMock extends AxiosStatic {
  mockResolvedValue: (response) => void;
  mockRejectedValue: (error) => void;
}
const mockAxios = axios as AxiosMock;

describe("Fetcher Suite", () => {
  const response = {
    status: 200,
    body: {},
    headers: {},
    data: {
      statusMessage: "success",
    },
  };
  const options = {
    url: "anyURL",
    method: "GET",
  };
  it("should call API successfully", async () => {
    mockAxios.mockResolvedValue(response);
    const result = await fetcher(options, false);
    expect(axios).toHaveBeenCalledTimes(1);
    expect(axios).toHaveBeenCalledWith({ ...options });
    expect(result).toEqual(response.data);
  });

  it("should need full response", async () => {
    response.headers["x-total-count"] = 5;
    mockAxios.mockResolvedValue(response);
    const result = await fetcher(options, true);
    expect(axios).toHaveBeenCalledTimes(1);
    expect(axios).toHaveBeenCalledWith({ ...options });
    expect(result).toEqual({
      data: response.data,
      count: response.headers["x-total-count"],
    });
  });

  it("should API failed", async () => {
    mockAxios.mockRejectedValue(API_MESSAGES.INTERNAL_SERVER_ERROR);
    await expect(fetcher(options, false)).rejects.toEqual(
      API_MESSAGES.INTERNAL_SERVER_ERROR
    );
    expect(axios).toHaveBeenCalledTimes(1);
    expect(axios).toHaveBeenCalledWith({ ...options });
  });
});
