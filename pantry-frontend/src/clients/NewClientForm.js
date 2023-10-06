import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import PantryApi from "../pantryApi";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Pantry
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const pantryTheme = createTheme();

function NewClientForm() {
  let date = moment();
  let currentDate = date.format("YYYY-MM-DD");

  const initialState = {
    firstName: "",
    altFirstName: "",
    lastName: "",
    altLastName: "",
    address: "",
    phone: "",
    altPhone: "",
    numberAdultsInFamily: 0,
    numberKidsInFamily: 0,
    receiveBenefits: "",
    isEligible: true,
    race: "",
    isHispanic: "",
    createDate: currentDate,
    lastVisit: currentDate,
  };

  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState([]);
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    let client = await PantryApi.addClient(formData);

    if (client) {
      history.push("/clients");
    } else {
      setFormErrors(client.err);
    }
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  //   function isError(formErrors) {
  //     if (!formErrors) return null;
  //     else {
  //       return formErrors.map((e) => ({ e }));
  //     }
  //   }

  return (
    <ThemeProvider theme={pantryTheme}>
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
            New Client Form
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              onChange={handleChange}
              value={formData.firstName}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="lastName"
              label="Last Name"
              id="lastName"
              onChange={handleChange}
              value={formData.lastName}
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="altFirstName"
              label="Alternate First Name"
              id="altFirstName"
              onChange={handleChange}
              value={formData.altFirstName}
              autoFocus
            />

            <TextField
              margin="normal"
              fullWidth
              name="altLastName"
              label="Alternate Last Name"
              id="altLastName"
              onChange={handleChange}
              value={formData.altLastName}
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="address"
              label="Address"
              id="address"
              onChange={handleChange}
              value={formData.address}
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="phone"
              label="Phone Number"
              id="phone"
              onChange={handleChange}
              value={formData.phone}
              autoFocus
            />

            <TextField
              margin="normal"
              fullWidth
              name="altPhone"
              label="Alternate Phone Number"
              id="altPhone"
              onChange={handleChange}
              value={formData.altPhone}
              autoFocus
            />

            <TextField
              margin="normal"
              fullWidth
              select
              name="numberKidsInFamily"
              label="Number of Kids in Family"
              id="numberKidsInFamily"
              onChange={handleChange}
              value={formData.numberKidsInFamily}
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
              onChange={handleChange}
              value={formData.numberAdultsInFamily}
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
              name="receiveBenefits"
              label="Receive Benefits?"
              id="receiveBenefits"
              onChange={handleChange}
              value={formData.receiveBenefits}
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
              onChange={handleChange}
              value={formData.isEligible}
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
              onChange={handleChange}
              value={formData.race}
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
              <MenuItem value={"Prefer not to say"}>Prefer not to say</MenuItem>
            </TextField>

            <TextField
              margin="normal"
              select
              fullWidth
              name="isHispanic"
              label="Hispanic?"
              id="isHispanic"
              onChange={handleChange}
              value={formData.isHispanic}
              autoFocus
            >
              <MenuItem value={"Yes"}>Yes</MenuItem>
              <MenuItem value={"No"}>No</MenuItem>
              <MenuItem value={"Prefer not to say"}>Prefer not to say</MenuItem>
            </TextField>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default NewClientForm;
