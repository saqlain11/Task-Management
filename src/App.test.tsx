import { render, waitFor } from "@testing-library/react";
import App from "./App";
import React, {lazy, Suspense} from "react";
import { act } from "react-dom/test-utils";
jest.mock("react",()=>({
  ...jest.requireActual("react"),
   lazy :() => ()=>"Component"
  }))

describe("App Suite", () => {
  it("should Render Correctly", async() => {

      const { asFragment } =  render(<Suspense fallback="loading"><App /></Suspense>);
      await waitFor(()=> expect(asFragment()).toMatchSnapshot())
  });
});
