import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PantryApi from "../pantryApi";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import OrderCard from "./OrderCard";

// Displays a page with list of all orders
// On mount loads from API
// Routed as "/orders"

// Routes to -> OrderCard

function OrderList() {
  const [orders, setOrders] = useState([]);

  // upon loading, call API to get a list of all food
  useEffect(() => {
    async function getOrders() {
      let orders = await PantryApi.getAllOrders();
      setOrders(orders);
    }
    getOrders();
  }, []);

  if (!orders) {
    return (
      <div>
        <CircularProgress color="secondary" />;
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <Box sx={{ mr: 3, ml: 3 }}>
          <Typography sx={{ mb: 1, fontSize: "2rem", ml: 2, mt: 2 }}>
            Client Orders
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Order Id</TableCell>

                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((o) => (
                <OrderCard
                  key={o.orderId}
                  orderId={o.orderId}
                  clientId={o.clientId}
                  date={o.date}
                />
              ))}
            </TableBody>
          </Table>
        </Box>
      </React.Fragment>
    );
  }
}

export default OrderList;
