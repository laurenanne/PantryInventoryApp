import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PantryApi from "../pantryApi";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import PurchaseItemCard from "../purchases/PurchaseItemCard";
import { useHistory } from "react-router-dom";
import formatDate from "../utilities/formatDate";
import Spinner from "../utilities/Spinner";

// Purchase Detail Page
// Renders information about each purchase
// Calls API to get purchase detail based on purchaseId, refreshes each time purchaseId is updated
//Routed as /purchases/:purchaseId

// Routes -> PurchaseItemCard

function PurchaseDetail({ updateInv }) {
  const { purchaseId } = useParams();
  const [purchase, setPurchase] = useState(null);
  const history = useHistory();

  useEffect(
    function getPurchaseDetails() {
      async function getPurchaseDetails() {
        try {
          setPurchase(await PantryApi.getPurchaseDetails(purchaseId));
        } catch (err) {
          setPurchase(null);
        }
      }
      getPurchaseDetails();
    },
    [purchaseId]
  );

  async function deletePurchase(evt) {
    evt.preventDefault();
    for (let i = 0; i < purchase.food.length; i++) {
      let quantNum = parseInt(purchase.food[i].quantity);
      let foodId = purchase.food[i].foodId;

      // since purchase is being deleted, for each food item in the purchase must update the food quantity in the inventory
      if (quantNum) {
        await updateInv(foodId, -Math.abs(quantNum));
      }
    }

    await PantryApi.removePurchase(purchaseId);

    // return to purchase page
    history.push("/purchases");
  }

  if (!purchase) return <Spinner />;

  return (
    <Box sx={{ mr: 3, ml: 3, mt: 3 }}>
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
            <span
              onClick={deletePurchase}
              className="material-symbols-outlined"
            >
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
            Purchase Date: {formatDate(purchase.date)}
          </Typography>
        </Box>

        <Typography sx={{ textAlign: "center" }}>Id: {purchaseId}</Typography>

        <PurchaseItemCard food={purchase.food} />
      </Box>
    </Box>
  );
}

export default PurchaseDetail;
