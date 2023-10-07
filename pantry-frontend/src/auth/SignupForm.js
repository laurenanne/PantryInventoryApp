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
import { useHistory } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";

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

function SignupForm({ signup }) {
  const initialValue = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };

  const [formErrors, setFormErrors] = useState([]);
  const history = useHistory();

  const signupValidation = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Enter Your Password"),
    firstName: yup.string().required("Enter Your First Name"),
    lastName: yup.string().required("Enter Your Last Name"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Enter Your Email"),
  });

  async function handleSubmit(values, props) {
    try {
      await signup(values);
      props.resetForm();
      history.pushState("/food");
    } catch (err) {
      setFormErrors(err);
    }
  }

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
            <span className="material-symbols-outlined">login</span>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Formik
            initialValues={initialValue}
            validationSchema={signupValidation}
            onSubmit={handleSubmit}
          >
            {(props) => {
              const {
                username,
                password,
                firstName,
                lastName,
                email,
              } = props.values;
              return (
                <Form>
                  <Grid container sx={{ mt: 2 }} spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        value={firstName}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        helperText={<ErrorMessage name="firstName" />}
                        error={
                          props.errors.firstName && props.touched.firstName
                        }
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        value={lastName}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        helperText={<ErrorMessage name="lastName" />}
                        error={props.errors.lastName && props.touched.lastName}
                        autoComplete="family-name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={email}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        helperText={<ErrorMessage name="email" />}
                        error={props.errors.email && props.touched.email}
                        autoComplete="email"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="username"
                        label="Username"
                        type="username"
                        id="username"
                        value={username}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        helperText={<ErrorMessage name="username" />}
                        error={props.errors.username && props.touched.username}
                        autoComplete="username"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        helperText={<ErrorMessage name="password" />}
                        error={props.errors.password && props.touched.password}
                        autoComplete="new-password"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
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

                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="/" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignupForm;
