import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Link from "@mui/material/Link";

function LoginForm({ login }) {
  const initialValue = {
    username: "",
    password: "",
  };

  const loginValidation = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Enter Your Password"),
  });

  const [formErrors, setFormErrors] = useState(null);
  const history = useHistory();

  async function handleSubmit(values, props) {
    let resp = await login(values);
    if (resp.success) {
      props.resetForm();
      history.push("/home");
    } else {
      setFormErrors("Incorrect username/password");
    }
  }

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {/* <CssBaseline /> */}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(./greenBeans.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <span className="material-symbols-outlined">login</span>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Formik
            initialValues={initialValue}
            validationSchema={loginValidation}
            onSubmit={handleSubmit}
          >
            {(props) => {
              const { username, password } = props.values;
              return (
                <Form>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    value={username}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    autoFocus
                    helperText={<ErrorMessage name="username" />}
                    error={props.errors.username && props.touched.username}
                    autoComplete="username"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    name="password"
                    value={password}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    label="Password"
                    type="password"
                    helperText={<ErrorMessage name="password" />}
                    error={props.errors.password && props.touched.password}
                    autoComplete="current-password"
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>

                  <Grid item xs={12} sx={{ textAlign: "center", color: "red" }}>
                    {formErrors ? (
                      <span>
                        <Typography>{formErrors}</Typography>
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </Grid>

                  <Grid container justifyContent="center">
                    <Grid item>
                      <Link
                        href="mailto:cjgbrady@gmail.com'"
                        fontSize="1rem"
                        color="secondary.dark"
                        variant="body2"
                      >
                        Request an account
                      </Link>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LoginForm;
