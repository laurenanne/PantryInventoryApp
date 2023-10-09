import React from "react";
import { render } from "@testing-library/react";
import OrderCard from "./OrderCard";
import { UserProvider } from "../testUtils";

it("matches snapshot", function() {
  let order = { orderId: "1", date: "2023-10-08" };
  const { asFragment } = render(<OrderCard order={order} />);
  expect(asFragment()).toMatchSnapshot();
});
