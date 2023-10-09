import React from "react";
import { render } from "@testing-library/react";
import PurchaseList from "./PurchaseList";

it("matches snapshot", function() {
  const { asFragment } = render(<PurchaseList />);
  expect(asFragment()).toMatchSnapshot();
});
