import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App authlevel={null} />);
  const textElement = screen.getByText(/God/i);
  expect(textElement).toBeInTheDocument();
});
