import React from "react";
import { render } from "@testing-library/react";
import ClientDetails from "./ClientDetails";
import { MemoryRouter, Route } from "react-router-dom";
import { UserProvider } from "../testUtils";

it("renders without crashing", function() {
  render(
    <MemoryRouter>
      <UserProvider>
        <ClientDetails />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function() {
  const { asFragment } = render(
    <MemoryRouter initialEntries={["/clients/1"]}>
      <UserProvider>
        <Route path="/clients/:clientId">
          <ClientDetails />
        </Route>
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
