import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "./purchases.css";
import PantryApi from "../pantryApi";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function NewPurchaseItemForm({
  foodId,
  name,
  purchaseId,
  inventory,
  updateInv,
}) {
  const initialState = {
    quantity: 0,
    pricePerUnit: 0,
  };

  const pantryTheme = createTheme();

  const [items, setItems] = useState(initialState);
  const [formErrors, setFormErrors] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  async function addItem(event) {
    event.preventDefault();
    let quantNum = parseInt(items.quantity);

    let purchaseItem = await PantryApi.addPurchaseItems(
      purchaseId,
      foodId,
      items
    );

    if (purchaseItem) {
      setDisabled(true);
      setIsAdded(true);
      let update = await updateInv(foodId, quantNum);
    } else {
      setFormErrors(purchaseItem.err);
    }
  }

  async function removeItem(event) {
    event.preventDefault();

    const quantNum = parseInt(items.quantity);
    console.log(quantNum);
    let res = await PantryApi.removePurchaseItem(purchaseId, foodId);

    if (res) {
      setIsAdded(false);
      setDisabled(false);
      setItems(initialState);

      let update = await updateInv(foodId, -Math.abs(quantNum));
    } else {
      // setFormErrors(orderItem.err);
    }
  }

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setItems((data) => ({
      ...data,
      [name]: value,
    }));
  };

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
        {/* <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}> */}
        <Box
          sx={{
            border: 1,
            width: "100%",
          }}
        >
          <Typography sx={{ textAlign: "center", bgcolor: "primary.main" }}>
            {name}
          </Typography>
        </Box>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          id={foodId}
          className="purchaseItem"
        >
          <TextField
            disabled={disabled}
            label="Quantity"
            id="quantity"
            fullWidth
            name="quantity"
            onChange={handleChange}
            value={items.quantity}
          />

          <TextField
            disabled={disabled}
            label="Price Per Unit"
            id="pricePerUnit"
            fullWidth
            name="pricePerUnit"
            onChange={handleChange}
            value={items.pricePerUnit}
          />

          {!isAdded ? (
            <Button
              size="small"
              onClick={addItem}
              // disabled={disabled}
              type="submit"
              variant="outlined"
              sx={{ ml: 2 }}
            >
              Add
            </Button>
          ) : (
            <Button
              size="small"
              onClick={removeItem}
              // disabled={disabled}
              type="submit"
              variant="outlined"
              sx={{ ml: 2 }}
            >
              Remove
            </Button>
          )}
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default NewPurchaseItemForm;
