import React from "react";
import { render } from "@testing-library/react";
import PurchaseDetails from "./PurchaseDetails";
import { MemoryRouter, Route } from "react-router-dom";
import { UserProvider } from "../testUtils";

it("renders without crashing", function() {
  render(
    <MemoryRouter>
      <UserProvider>
        <PurchaseDetails />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function() {
  const { asFragment } = render(
    <MemoryRouter initialEntries={["/purchases/1"]}>
      <UserProvider>
        <Route path="/purchases/:purchaseId">
          <PurchaseDetails />
        </Route>
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
