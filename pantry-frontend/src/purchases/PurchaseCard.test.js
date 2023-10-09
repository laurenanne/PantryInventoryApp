import React from "react";
import { render } from "@testing-library/react";
import PurchaseCard from "./PurchaseCard";
import { UserProvider } from "../testUtils";

it("matches snapshot", function() {
  let purchase = { purchaseId: 2, date: "2023-10-08" };
  const { asFragment } = render(<PurchaseCard purchase={purchase} />);
  expect(asFragment()).toMatchSnapshot();
});
