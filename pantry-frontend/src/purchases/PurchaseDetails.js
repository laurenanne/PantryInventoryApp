import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PantryApi from "../pantryApi";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import PurchaseItemCard from "../purchases/PurchaseItemCard";
import { useHistory } from "react-router-dom";

function PurchaseDetail() {
  const { purchaseId } = useParams();
  const [purchase, setPurchase] = useState(null);
  const history = useHistory();

  useEffect(
    function getPurchaseDetails() {
      async function getPurchaseDetails() {
        setPurchase(await PantryApi.getPurchaseDetails(purchaseId));
      }

      getPurchaseDetails();
    },
    [purchaseId]
  );

  // async function deletePurchase(evt) {
  //   evt.preventDefault();
  //   let res = await PantryApi.removePurchase(purchaseId);
  //   console.log(res);
  //   if (res) {
  //   }

  //   // return to purchase page
  //   history.push("/purchases");
  // }

  // async function editPurchase() {
  //   return null;
  // }

  if (!purchase)
    return (
      <div>
        <CircularProgress color="secondary" />;
      </div>
    );
  else {
    let date = purchase.date.toString().slice(0, 10);
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
            {/* <Typography align="right">
              <span
                onClick={editPurchase}
                className="material-symbols-outlined"
              >
                edit
              </span>
            </Typography> */}
          </Box>
          {/* <Box>
            <Typography align="right">
              <span
                onClick={deletePurchase}
                className="material-symbols-outlined"
              >
                delete
              </span>
            </Typography>
          </Box> */}
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
              Purchase Date: {date}
            </Typography>
          </Box>

          <Typography sx={{ textAlign: "center" }}>Id: {purchaseId}</Typography>

          <PurchaseItemCard food={purchase.food} />
        </Box>
      </Box>
    );
  }
}

export default PurchaseDetail;
