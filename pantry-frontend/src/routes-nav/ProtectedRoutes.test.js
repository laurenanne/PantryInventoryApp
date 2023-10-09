import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils";
import ProtectedRoutes from "./ProtectedRoutes";

it("renders without crashing", function() {
  render(
    <MemoryRouter>
      <UserProvider>
        <ProtectedRoutes />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function() {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <ProtectedRoutes />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot when logged out", function() {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider currentUser={null}>
        <ProtectedRoutes />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
