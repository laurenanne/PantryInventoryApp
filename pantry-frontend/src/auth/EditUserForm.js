import React, { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useHistory } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import UserContext from "../auth/UserContext";

function EditUserForm({ editUser }) {
  const { currentUser } = useContext(UserContext);

  const initialValue = {
    password: "",
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
  };

  const [formErrors, setFormErrors] = useState([]);
  const history = useHistory();

  const editValidation = yup.object().shape({
    password: yup.string(),
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string().email("Invalid email format"),
  });

  async function handleSubmit(values, props) {
    let res = await editUser(currentUser.username, values);
    if (res.success) {
      props.resetForm();
      history.push("/home");
    } else {
      setFormErrors(res.err);
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
          Edit User Profile
        </Typography>

        <Formik
          initialValues={initialValue}
          validationSchema={editValidation}
          onSubmit={handleSubmit}
        >
          {(props) => {
            const { password, firstName, lastName, email } = props.values;
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
                      disabled
                      name="username"
                      label="Username"
                      type="username"
                      id="username"
                      value={currentUser.username}
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
                  Submit
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

export default EditUserForm;
