import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import PantryApi from "../pantryApi";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./orders.css";
import Grid from "@mui/material/Grid";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { Typography } from "@mui/material";

// Is rendered by NewOrderForm
// Renders a food form for each item: displays food name and quantity
// calls API for each quantity/foodId selected and adds to exisiting orderId

// Once added a delete button is displayed and item can be deleted
// calls API for each quantity/foodId selected and deletes from exisiting orderId

function NewOrderItemForm({
  foodId,
  name,
  orderId,
  inventory,
  total,
  setTotal,
  updateInv,
}) {
  const [disabled, setDisabled] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checkDisabled, setCheckDisabled] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
  };

  const [formErrors, setFormErrors] = useState(null);

  const initialValue = {
    quantity: "",
  };

  const orderValidation = yup.object().shape({
    quantity: yup
      .number()
      .max(12 - total, "Limit of 12 items")
      .test("Limit of 2", (quantity) => quantity <= 2)
      .test("Inventory Low", (quantity) => quantity <= inventory),
  });

  function handleSubmit(values, props) {
    !isAdded ? addItem(values, props) : removeOrderItem(values, props);
  }

  async function addItem(values, props) {
    const quantNum = parseInt(values.quantity);

    try {
      await PantryApi.addOrderItems(orderId, foodId, {
        quantity: values.quantity,
      });
      setIsAdded(true);
      setCheckDisabled(true);
      setDisabled(true);
      setTotal(total + quantNum);

      try {
        await updateInv(foodId, -Math.abs(quantNum));
      } catch (err) {
        setFormErrors(err);
      }
    } catch (err) {
      setFormErrors(err);
    }
  }

  async function removeOrderItem(values, props) {
    const quantNum = parseInt(values.quantity);

    try {
      await PantryApi.removeOrderItem(orderId, foodId);
      setIsAdded(false);
      setCheckDisabled(false);
      setDisabled(false);
      props.resetForm();
      setTotal(total - quantNum);

      try {
        await updateInv(foodId, quantNum);
      } catch (err) {
        setFormErrors(err);
      }
    } catch (err) {
      setFormErrors(err);
    }
  }

  return (
    <React.Fragment>
      <Formik
        initialValues={initialValue}
        validationSchema={orderValidation}
        onSubmit={handleSubmit}
      >
        {(props) => {
          const { quantity } = props.values;
          return (
            <Form>
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={!checked ? 12 : 5}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        disabled={checkDisabled}
                        name={name}
                        onChange={handleCheckChange}
                      />
                    }
                    label={name}
                  />
                </Grid>

                <Grid item xs={3}>
                  {checked ? (
                    <TextField
                      name="quantity"
                      disabled={disabled}
                      label="#"
                      autoFocus
                      id="quantity"
                      type="integer"
                      value={quantity}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      helperText={<ErrorMessage name="quantity" />}
                      error={props.errors.quantity && props.touched.quantity}
                    />
                  ) : (
                    ""
                  )}
                </Grid>

                <Grid item xs={4}>
                  {checked && !isAdded ? (
                    <Button type="submit" size="small">
                      Add to Cart
                    </Button>
                  ) : (
                    ""
                  )}

                  {isAdded ? (
                    <Button type="submit" size="small">
                      <span className="material-symbols-outlined">delete</span>
                    </Button>
                  ) : (
                    ""
                  )}
                </Grid>

                <Grid item xs={12} sx={{ textAlign: "center", color: "red" }}>
                  {formErrors ? (
                    <span>
                      <Typography>{formErrors}</Typography>
                    </span>
                  ) : (
                    <span></span>
                  )}
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
}

export default NewOrderItemForm;
