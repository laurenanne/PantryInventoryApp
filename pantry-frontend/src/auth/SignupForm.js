import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useHistory } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";

// Requires authorization
// New User can be created by existing user who is Admin
// Formik handles onChange and validation
// Routed as /signup
// Shows Signup form and calls signup function prop
// On submission redirects to "/home" route

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

  // Form validation schema for the form input
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

  // Handles form submission
  // If success redirects to Dashboard on "/home" else displays error
  async function handleSubmit(values, props) {
    let resp = await signup(values);
    if (resp.success) {
      props.resetForm();
      history.push("/home");
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
                      error={props.errors.firstName && props.touched.firstName}
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

                <Grid container justifyContent="center">
                  <Grid item>
                    <Link
                      href="/"
                      fontSize="1rem"
                      color="secondary.dark"
                      variant="body2"
                    >
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Container>
  );
}

export default SignupForm;
