import React from "react";
import { render } from "@testing-library/react";
import FoodList from "./FoodList";

it("matches snapshot", function() {
  const { asFragment } = render(<FoodList />);
  expect(asFragment()).toMatchSnapshot();
});
