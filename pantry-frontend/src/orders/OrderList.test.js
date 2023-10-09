import React from "react";
import { render } from "@testing-library/react";
import OrderList from "./OrderList";

it("matches snapshot", function() {
  const { asFragment } = render(<OrderList />);
  expect(asFragment()).toMatchSnapshot();
});
