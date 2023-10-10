import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import "./purchases.css";

// renders from PurchaseDetails
// displays table cells of food name and food quantity and food price per unit for each foodId in the purchase

function PurchaseItemCard({ food }) {
  let quantityTotal = 0;
  let valTotal = 0;
  for (let i = 0; i < food.length; i++) {
    quantityTotal = quantityTotal + food[i].quantity;
    valTotal = valTotal + food[i].quantity * food[i].pricePerUnit;
  }

  return (
    <React.Fragment>
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price Per Unit</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {food.map((f) => (
              <TableRow key={f.foodId}>
                <TableCell>{f.name}</TableCell>
                <TableCell align="right">{f.quantity}</TableCell>
                <TableCell align="right">{f.pricePerUnit}</TableCell>
                <TableCell align="right">
                  {(f.quantity * f.pricePerUnit).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell sx={{ fontWeight: "bold" }} align="right" colSpan={2}>
                Subtotal
              </TableCell>
              <TableCell align="right">{valTotal.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </React.Fragment>
  );
}

export default PurchaseItemCard;
