import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import PantryApi from "../pantryApi";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./orders.css";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";

function NewOrderItemForm({
  foodId,
  name,
  orderId,
  inventory,
  total,
  setTotal,
  updateInv,
}) {
  //   const history = useHistory();
  const [disabled, setDisabled] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checkDisabled, setCheckDisabled] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
  };

  const [quantity, setQuantity] = useState("");
  const [formErrors, setFormErrors] = useState(null);

  //   }

  async function addItem(event) {
    event.preventDefault();
    const quantNum = parseInt(quantity);

    if (total + quantNum > 12) {
      console.log("ERROR");
      setQuantity(0);

      return total;
    }

    if (quantNum > inventory) {
      console.log("ERROR");
      setQuantity(0);
      setDisabled(true);
      setCheckDisabled(true);
    } else {
      let orderItem = await PantryApi.addOrderItems(orderId, foodId, {
        quantity: quantity,
      });
      if (orderItem) {
        setIsAdded(true);
        setCheckDisabled(true);
        setTotal(total + quantNum);

        let update = await updateInv(foodId, -Math.abs(quantNum));
      } else {
        setFormErrors(orderItem.err);
      }
    }
  }

  async function removeOrderItem(event) {
    event.preventDefault();
    const quantNum = parseInt(quantity);
    let res = await PantryApi.removeOrderItem(orderId, foodId);

    if (res) {
      setIsAdded(false);
      setCheckDisabled(false);
      setQuantity("");
      setTotal(total - quantNum);

      let update = await updateInv(foodId, quantNum);
    } else {
      //   setFormErrors(orderItem.err);
    }
  }

  const handleChange = (evt) => {
    setQuantity(evt.target.value);
  };

  //   async function addItem(event) {
  //     event.preventDefault();

  // // within food array find food item where key in object = (foodId)
  // for (let key in formData) {
  //   if (formData[key]) {
  //     const quantity = formData[key];
  //     const item = food.find((f) => f.foodId === parseInt(key));

  //     if (quantity > item.inventory) {
  //       // ERROR MESSAGE HERE
  //     } else {
  //       const foodItem = await PantryApi.addOrderItems(order.orderId, key, {
  //         quantity,
  //       });

  //       if (foodItem) {
  //         history.push("/clients");
  //       }
  //     }
  //   }
  // }

  return (
    <React.Fragment>
      {/* <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      > */}

      {/* <FormGroup aria-label="position" row> */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* sx={{ display: "flex", flexDirection: "row" }} */}
        <Grid item xs={!checked ? 12 : 5}>
          <FormControlLabel
            //   className="label-style"
            control={
              <Checkbox
                checked={checked}
                disabled={checkDisabled}
                // id={foodId}
                name={name}
                onChange={handleCheckChange}
              />
            }
            label={name}
          />
        </Grid>
        <Grid item xs={3}>
          {/* sx={{ mt: 0 }} */}
          {checked ? (
            <TextField
              //   id=`{foodId}`
              name={name}
              disabled={disabled}
              label="#"
              onChange={handleChange}
              autoFocus
              value={quantity}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
            </TextField>
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={4}>
          {checked && !isAdded ? (
            <Button size="small" onClick={addItem}>
              Add to Cart
            </Button>
          ) : (
            ""
          )}
          {isAdded ? (
            <Button size="small" onClick={removeOrderItem}>
              <span className="material-symbols-outlined">delete</span>
            </Button>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
      {/* </FormGroup> */}

      {/* </Box> */}
    </React.Fragment>
  );
}

export default NewOrderItemForm;
