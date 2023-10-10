import React from "react";
import { render } from "@testing-library/react";
import PurchaseCard from "./PurchaseCard";
import { MemoryRouter } from "react-router";

it("matches snapshot", function() {
  let purchase = { purchaseId: 2, date: "2023-10-08" };

  const { asFragment } = render(
    <MemoryRouter>
      <PurchaseCard purchase={purchase} />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
