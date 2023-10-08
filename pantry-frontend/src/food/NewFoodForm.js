import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useHistory } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Grid from "@mui/material/Grid";

function NewFoodForm({ addNewFood }) {
  const initialValue = {
    name: "",
    inventory: "",
  };

  const foodValidation = yup.object().shape({
    name: yup.string("Enter a valid name").required("Name is required"),
    inventory: yup.number("Enter an inventory amount"),
  });

  const history = useHistory();

  const [formErrors, setFormErrors] = useState(null);

  async function handleSubmit(values, props) {
    let resp = await addNewFood({
      name: values.name,
      inventory: parseInt(values.inventory),
    });

    if (resp.success) {
      props.resetForm();
      history.push("/food");
    } else {
      setFormErrors(resp.err);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <span className="material-symbols-outlined">nutrition</span>
        </Avatar>
        <Typography component="h1" variant="h5">
          Add a New Food
        </Typography>

        <Formik
          initialValues={initialValue}
          validationSchema={foodValidation}
          onSubmit={handleSubmit}
        >
          {(props) => {
            const { name, inventory } = props.values;
            return (
              <Form>
                <TextField
                  label="Name"
                  name="name"
                  fullWidth
                  variant="outlined"
                  margin="dense"
                  value={name}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  helperText={<ErrorMessage name="name" />}
                  error={props.errors.name && props.touched.name}
                  required
                />
                <TextField
                  label="Inventory"
                  name="inventory"
                  fullWidth
                  variant="outlined"
                  margin="dense"
                  value={inventory}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  helperText={<ErrorMessage name="inventory" />}
                  error={props.errors.inventory && props.touched.inventory}
                  required
                />

                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>

                <Grid item xs={12} sx={{ textAlign: "center", color: "red" }}>
                  {formErrors ? (
                    <span>
                      {formErrors.map((e) => (
                        <p className="mb-0">{e}</p>
                      ))}
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
    </Container>
  );
}

export default NewFoodForm;
