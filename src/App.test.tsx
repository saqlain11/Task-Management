import { render, screen } from "@testing-library/react";
import App from "./App";
import React from "react";

describe("App Suite", () => {
  it("should Render Correctly", () => {
    const { asFragment } = render(<App />);
    expect(asFragment).toMatchSnapshot();
  });
});
