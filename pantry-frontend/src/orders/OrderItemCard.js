import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";

function OrderItemCard({ food }) {
  let quantityTotal = 0;
  for (let i = 0; i < food.length; i++) {
    quantityTotal = quantityTotal + food[i].quantity;
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
              {/* <TableCell align="right">Total</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {food.map((f) => (
              <TableRow key={f.foodId}>
                <TableCell>{f.name}</TableCell>
                <TableCell align="right">{f.quantity}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }} align="right" colSpan={1}>
                Subtotal
              </TableCell>
              <TableCell align="right">{quantityTotal}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </React.Fragment>
  );
}

export default OrderItemCard;
