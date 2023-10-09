import React from "react";
import { render } from "@testing-library/react";
import OrderDetails from "./OrderDetails";
import { MemoryRouter, Route } from "react-router-dom";
import { UserProvider } from "../testUtils";

it("renders without crashing", function() {
  render(
    <MemoryRouter>
      <UserProvider>
        <OrderDetails />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function() {
  const { asFragment } = render(
    <MemoryRouter initialEntries={["/orders/1"]}>
      <UserProvider>
        <Route path="/orders/:orderId">
          <OrderDetails />
        </Route>
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
