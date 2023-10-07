import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "./purchases.css";
import PantryApi from "../pantryApi";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Grid from "@mui/material/Grid";

function NewPurchaseItemForm({ foodId, name, purchaseId, updateInv }) {
  const [formErrors, setFormErrors] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const initialValue = {
    quantity: 0,
    pricePerUnit: 0,
  };

  const pantryTheme = createTheme();

  const purchaseValidation = yup.object().shape({
    quantity: yup.number(),
    pricePerUnit: yup.number().positive(),
  });

  function handleSubmit(values, props) {
    console.log("here");
    !isAdded ? addItem(values, props) : removeItem(values, props);
  }

  async function addItem(values, props) {
    let quantNum = parseInt(values.quantity);

    try {
      await PantryApi.addPurchaseItems(purchaseId, foodId, values);
      setDisabled(true);
      setIsAdded(true);

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
                  <Button
                    size="small"
                    fullWidth
                    type="submit"
                    variant="outlined"
                  >
                    Add
                  </Button>
                ) : (
                  <Button
                    size="small"
                    fullWidth
                    type="submit"
                    variant="outlined"
                  >
                    Remove
                  </Button>
                )}
              </Form>
            );
          }}
        </Formik>
      </Box>
    </React.Fragment>
  );
}

export default NewPurchaseItemForm;
