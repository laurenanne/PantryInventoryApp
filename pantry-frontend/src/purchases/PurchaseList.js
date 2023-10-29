import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PantryApi from "../pantryApi";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import PurchaseCard from "./PurchaseCard";
import Spinner from "../utilities/Spinner";

// Displays a page with list of all purchases
// On mount loads from API
// Routed as "/purchases"

// Routes to -> PurchaseCard

function PurchaseList() {
  const [purchases, setPurchases] = useState(null);
  const history = useHistory();

  // upon loading, call API to get a list of all food
  useEffect(() => {
    async function getPurchases() {
      try {
        let result = await PantryApi.getPurchases();
        setPurchases(result);
      } catch (err) {
        setPurchases(null);
      }
    }
    getPurchases();
  }, []);

  // function to add new purchase to the list
  async function addPurchase() {
    history.push(`/purchases/new`);
  }

  if (!purchases) return <Spinner />;
  return (
    <React.Fragment>
      <Box sx={{ mr: 3, ml: 3 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography sx={{ mb: 1, fontSize: "2rem", ml: 2, mt: 2 }}>
            Purchase Orders
          </Typography>

          <Typography sx={{ mb: 1, fontSize: "2rem", ml: 2, mt: 2 }}>
            <Button onClick={addPurchase}>
              <span className="material-symbols-outlined">add</span>
            </Button>
          </Typography>
        </div>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Purchase Id</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchases.map((p) => (
              <PurchaseCard
                key={p.purchaseId}
                purchaseId={p.purchaseId}
                date={p.date}
              />
            ))}
          </TableBody>
        </Table>
      </Box>
    </React.Fragment>
  );
}

export default PurchaseList;
