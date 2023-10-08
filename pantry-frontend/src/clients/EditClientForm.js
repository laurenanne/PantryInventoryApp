import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useHistory } from "react-router-dom";
import PantryApi from "../pantryApi";
import MenuItem from "@mui/material/MenuItem";
import { useLocation } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";

function EditClientForm() {
  const location = useLocation();
  const client = location.state.params;

  const initialValue = {
    firstName: client.firstName,
    altFirstName: client.altFirstName,
    lastName: client.lastName,
    altLastName: client.altLastName,
    address: client.address,
    phone: client.phone,
    altPhone: client.altPhone,
    numberAdultsInFamily: client.numberAdultsInFamily,
    numberKidsInFamily: client.numberKidsInFamily,
    receiveBenefits: client.receiveBenefits,
    isEligible: client.isEligible,
    race: client.race,
    isHispanic: client.isHispanic,
  };

  const phoneNumberRegEx = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

  const [formErrors, setFormErrors] = useState([]);
  const history = useHistory();

  const clientValidation = yup.object().shape({
    address: yup.string(),

    phone: yup
      .string()
      .matches(phoneNumberRegEx, "Invalid Phone Number")
      .max(12, "Invalid Phone Number"),

    altPhone: yup
      .string()
      .matches(phoneNumberRegEx, "Invalid Phone Number")
      .max(12, "Invalid Phone Number"),

    numberAdultsInFamily: yup.number().oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8]),

    numberKidsInFamily: yup.number().oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8]),

    receiveBenefits: yup.string().oneOf(["Yes", "No"]),

    isEligible: yup.boolean().required("Must select Yes or No"),

    race: yup
      .string()
      .oneOf([
        "White",
        "American Indian or Alaska Native",
        "Asian",
        "Native Hawaiian or Other Pacific Islander",
        "Prefer not to say",
      ]),

    isHispanic: yup.string().oneOf(["Yes", "No", "Prefer not to say"]),

    createDate: yup.date(),

    lastVisit: yup.date(),
  });

  async function handleSubmit(values, props) {
    try {
      await PantryApi.editClient(client.clientId, values);
      props.resetForm();
      history.push(`/clients/${client.clientId}`);
    } catch (err) {
      setFormErrors(err);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <span className="material-symbols-outlined">person_add</span>
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit Client Form
        </Typography>

        <Formik
          initialValues={initialValue}
          validationSchema={clientValidation}
          onSubmit={handleSubmit}
        >
          {(props) => {
            const {
              firstName,
              altFirstName,
              lastName,
              altLastName,
              address,
              phone,
              altPhone,
              numberAdultsInFamily,
              numberKidsInFamily,
              receiveBenefits,
              isEligible,
              race,
              isHispanic,
            } = props.values;
            return (
              <Form>
                <TextField
                  margin="normal"
                  disabled
                  fullWidth
                  value={firstName}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  helperText={<ErrorMessage name="firstName" />}
                  error={props.errors.firstName && props.touched.firstName}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  disabled
                  fullWidth
                  value={lastName}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  helperText={<ErrorMessage name="lastName" />}
                  error={props.errors.lastName && props.touched.lastName}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  disabled
                  fullWidth
                  value={altFirstName}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  id="altFirstName"
                  label="Alternate First Name"
                  name="altFirstName"
                  helperText={<ErrorMessage name="altFirstName" />}
                  error={
                    props.errors.altFirstName && props.touched.altFirstName
                  }
                  autoFocus
                />

                <TextField
                  margin="normal"
                  disabled
                  fullWidth
                  value={altLastName}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  id="altLastName"
                  label="Alternate Last Name"
                  name="altLastName"
                  helperText={<ErrorMessage name="altLastName" />}
                  error={props.errors.altLastName && props.touched.altLastName}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  fullWidth
                  value={address}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  id="address"
                  label="Address"
                  name="address"
                  helperText={<ErrorMessage name="address" />}
                  error={props.errors.address && props.touched.address}
                  autoFocus
                />

                <TextField
                  margin="normal"
                  fullWidth
                  value={phone}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  id="phone"
                  label="Phone"
                  name="phone"
                  helperText={<ErrorMessage name="phone" />}
                  error={props.errors.phone && props.touched.phone}
                  autoFocus
                />

                <TextField
                  margin="normal"
                  fullWidth
                  value={altPhone}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  id="altPhone"
                  label="Alternate Phone"
                  name="altPhone"
                  helperText={<ErrorMessage name="altPhone" />}
                  error={props.errors.altPhone && props.touched.altPhone}
                  autoFocus
                />

                <TextField
                  margin="normal"
                  fullWidth
                  select
                  name="numberKidsInFamily"
                  label="Number of Kids in Family"
                  id="numberKidsInFamily"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={numberKidsInFamily}
                  helperText={<ErrorMessage name="numberKidsInFamily" />}
                  error={
                    props.errors.numberKidsInFamily &&
                    props.touched.numberKidsInFamily
                  }
                  type="integer"
                  autoFocus
                >
                  <MenuItem value={0}>None</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                </TextField>

                <TextField
                  margin="normal"
                  select
                  fullWidth
                  name="numberAdultsInFamily"
                  label="Number of Adults in Family"
                  id="numberAdultsInFamily"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={numberAdultsInFamily}
                  helperText={<ErrorMessage name="numberAdultsInFamily" />}
                  error={
                    props.errors.numberAdultsInFamily &&
                    props.touched.numberAdultsInFamily
                  }
                  type="integer"
                  autoFocus
                >
                  <MenuItem value={0}>None</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                </TextField>

                <TextField
                  margin="normal"
                  fullWidth
                  select
                  name="receiveBenefits"
                  label="Receive Benefits?"
                  id="receiveBenefits"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={receiveBenefits}
                  helperText={<ErrorMessage name="receiveBenefits" />}
                  error={
                    props.errors.receiveBenefits &&
                    props.touched.receiveBenefits
                  }
                  autoFocus
                >
                  <MenuItem value={"Yes"}>Yes</MenuItem>
                  <MenuItem value={"No"}>No</MenuItem>
                </TextField>

                <TextField
                  margin="normal"
                  required
                  select
                  fullWidth
                  name="isEligible"
                  label="Elgible for Pantry?"
                  id="isEligble"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={isEligible}
                  helperText={<ErrorMessage name="isEligible" />}
                  error={props.errors.isEligible && props.touched.isEligible}
                  autoFocus
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </TextField>

                <TextField
                  margin="normal"
                  select
                  fullWidth
                  name="race"
                  label="Race"
                  id="race"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={race}
                  helperText={<ErrorMessage name="race" />}
                  error={props.errors.race && props.touched.race}
                  autoFocus
                >
                  <MenuItem value={"White"}>White</MenuItem>
                  <MenuItem value={"Black or African American"}>
                    Black or African American
                  </MenuItem>
                  <MenuItem value={"American Indian or Alaska Native"}>
                    American Indian or Alaska Native
                  </MenuItem>
                  <MenuItem value={"Asian"}>Asian</MenuItem>
                  <MenuItem value={"Native Hawaiian or Other Pacific Islander"}>
                    Native Hawaiian or Other Pacific Islander
                  </MenuItem>
                  <MenuItem value={"Prefer not to say"}>
                    Prefer not to say
                  </MenuItem>
                </TextField>

                <TextField
                  margin="normal"
                  select
                  fullWidth
                  name="isHispanic"
                  label="Hispanic?"
                  id="isHispanic"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={isHispanic}
                  helperText={<ErrorMessage name="isHispanic" />}
                  error={props.errors.isHispanic && props.touched.isHispanic}
                  autoFocus
                >
                  <MenuItem value={"Yes"}>Yes</MenuItem>
                  <MenuItem value={"No"}>No</MenuItem>
                  <MenuItem value={"Prefer not to say"}>
                    Prefer not to say
                  </MenuItem>
                </TextField>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Update
                </Button>
                {formErrors ? (
                  <div>
                    {formErrors.map((e) => (
                      <p className="mb-0">{e}</p>
                    ))}
                  </div>
                ) : (
                  <div></div>
                )}
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Container>
  );
}

export default EditClientForm;
