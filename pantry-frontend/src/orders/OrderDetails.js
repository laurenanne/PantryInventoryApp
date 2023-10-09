import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PantryApi from "../pantryApi";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import OrderItemCard from "./OrderItemCard";
import { useHistory } from "react-router-dom";

function OrderDetails({ updateInv }) {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const history = useHistory();

  useEffect(
    function getOrderDetails() {
      async function getOrderDetails() {
        setOrder(await PantryApi.getOrder(orderId));
      }

      getOrderDetails();
    },
    [orderId]
  );

  async function deleteOrder(evt) {
    evt.preventDefault();
    for (let i = 0; i < order.food.length; i++) {
      let quantNum = parseInt(order.food[i].quantity);
      let foodId = order.food[i].foodId;

      if (quantNum) {
        try {
          await updateInv(foodId, quantNum);
        } catch (err) {
          console.log(err);
        }
      }
    }

    try {
      await PantryApi.removeOrder(orderId);
      // return to order page
      history.push("/orders");
    } catch (err) {
      console.log(err);
    }
  }

  if (!order)
    return (
      <div>
        <CircularProgress color="secondary" />;
      </div>
    );
  else {
    return (
      <Box sx={{ margin: 2 }}>
        <Box
          sx={{
            order: { xs: 1, sm: 2 },
            display: "flex",
            flexDirection: "row",
            justifyContent: "right",
            mr: 2,
          }}
        >
          <Box>
            <Typography align="right">
              <span onClick={deleteOrder} className="material-symbols-outlined">
                delete
              </span>
            </Typography>
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography sx={{ textAlign: "center" }}>
              Order Date: {order.date.toString().slice(0, 10)}
            </Typography>
          </Box>

          <Typography sx={{ textAlign: "center" }}>
            Order Id: {orderId}
          </Typography>

          <OrderItemCard
            orderId={orderId}
            updateInv={updateInv}
            food={order.food}
          />
        </Box>
      </Box>
    );
  }
}

export default OrderDetails;
