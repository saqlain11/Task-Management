import fetcher from "./fetcher";
import axios, { AxiosStatic } from "axios";

jest.mock("axios");

interface AxiosMock extends AxiosStatic {
  mockResolvedValue: (response) => void;
  mockRejectedValue: () => void;
}
const mockAxios = axios as AxiosMock;

describe("Fetcher Suite", () => {
  const response = {
    status: 200,
    body: {},
    data: {
      statusMessage: "success",
    },
  };
  const options = {
    url: "anyURL",
    method: "GET",
  };
  it("should call correctly", async () => {
    mockAxios.mockResolvedValue(response);
    const result = await fetcher(options, false);
    console.log("result", result);
  });
});
