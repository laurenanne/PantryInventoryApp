import React from "react";
import { render } from "@testing-library/react";
import ClientList from "./ClientList";

it("renders without crashing", function() {
  render(<ClientList />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<ClientList />);
  expect(asFragment()).toMatchSnapshot();
});
