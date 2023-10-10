import React from "react";
import { render } from "@testing-library/react";
import OrderCard from "./OrderCard";
import { MemoryRouter } from "react-router";

it("matches snapshot", function() {
  let order = { orderId: "1", date: "2023-10-08" };

  const { asFragment } = render(
    <MemoryRouter>
      <OrderCard order={order} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
