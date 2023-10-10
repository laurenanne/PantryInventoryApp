import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "./purchases.css";
import PantryApi from "../pantryApi";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";

// Is rendered by NewPurchaseForm
// Renders a food form for each item: displays food name and quantity and pricePerUnit
// calls API for each quantity/pricePerUnit/foodId selected and adds to exisiting purchaseId

// Once added a delete button is displayed and item can be deleted
// calls API for each quantity/pricePerUnit/foodId selected and deletes from exisiting purchaseId

function NewPurchaseItemForm({ foodId, name, purchaseId, updateInv }) {
  const [formErrors, setFormErrors] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const initialValue = {
    quantity: 0,
    pricePerUnit: 0,
  };

  const purchaseValidation = yup.object().shape({
    quantity: yup.number(),
    pricePerUnit: yup.number().positive(),
  });

  function handleSubmit(values, props) {
    !isAdded ? addItem(values, props) : removeItem(values, props);
  }

  async function addItem(values, props) {
    let quantNum = parseInt(values.quantity);

    try {
      await PantryApi.addPurchaseItems(purchaseId, foodId, values);
      setDisabled(true);
      setIsAdded(true);

      // if item successfully added must update the inventory for the food
      try {
        await updateInv(foodId, quantNum);
      } catch (err) {
        setFormErrors(err);
      }
    } catch (err) {
      setFormErrors(err);
    }
  }

  async function removeItem(values, props) {
    const quantNum = parseInt(values.quantity);
    try {
      await PantryApi.removePurchaseItem(purchaseId, foodId);
      setIsAdded(false);
      setDisabled(false);
      props.resetForm();

      // if item successfully removed must update the inventory for the quantity that has been deleted

      try {
        await updateInv(foodId, -Math.abs(quantNum));
      } catch (err) {
        setFormErrors(err);
      }
    } catch (err) {
      setFormErrors(err);
    }
  }

  return (
    <React.Fragment>
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography sx={{ textAlign: "center", color: "secondary.main" }}>
          {name}
        </Typography>

        <Formik
          initialValues={initialValue}
          validationSchema={purchaseValidation}
          onSubmit={handleSubmit}
        >
          {(props) => {
            const { quantity, pricePerUnit } = props.values;
            return (
              <Form>
                <TextField
                  margin="normal"
                  disabled={disabled}
                  label="Quantity"
                  id="quantity"
                  fullWidth
                  name="quantity"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={quantity}
                  helperText={<ErrorMessage name="quantity" />}
                  error={props.errors.quantity && props.touched.quantity}
                />

                <TextField
                  margin="normal"
                  disabled={disabled}
                  label="Price Per Unit"
                  id="pricePerUnit"
                  fullWidth
                  name="pricePerUnit"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={pricePerUnit}
                  helperText={<ErrorMessage name="pricePerUnit" />}
                  error={
                    props.errors.pricePerUnit && props.touched.pricePerUnit
                  }
                />

                {!isAdded ? (
                  <Button fullWidth type="submit" variant="contained">
                    Add
                  </Button>
                ) : (
                  <Button fullWidth type="submit" variant="contained">
                    Remove
                  </Button>
                )}

                <Grid item xs={12} sx={{ textAlign: "center", color: "red" }}>
                  {formErrors ? (
                    <span>
                      <Typography>{formErrors}</Typography>
                    </span>
                  ) : (
                    <span></span>
                  )}
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </React.Fragment>
  );
}

export default NewPurchaseItemForm;
