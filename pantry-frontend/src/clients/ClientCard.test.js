import React from "react";
import { render } from "@testing-library/react";
import ClientCard from "./ClientCard";
import { MemoryRouter, Route } from "react-router-dom";
import { UserProvider } from "../testUtils";

it("matches snapshot", function() {
  const { asFragment } = render(
    <MemoryRouter initialEntries={["/clients/1"]}>
      <UserProvider>
        <Route path="/clients/:clientId">
          <ClientCard />
        </Route>
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
