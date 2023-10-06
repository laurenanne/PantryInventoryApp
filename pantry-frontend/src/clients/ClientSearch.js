import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

const pantryTheme = createTheme();

function ClientSearch({ searchFor }) {
  const [searchName, setSearchName] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(searchName);
    console.log(searchFor);
    searchFor(searchName);

    // resets search bar
    setSearchName("");
  }

  const handleChange = (event) => {
    setSearchName(event.target.value);
  };

  return (
    <ThemeProvider theme={pantryTheme}>
      <Container component="main" width="100%">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 2, mb: 2, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="searchName"
              label="Search by Last Name"
              name="searchName"
              onChange={handleChange}
              value={searchName}
              autoComplete="Last name"
              autoFocus
            />
            {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            > */}

            <IconButton
              type="submit"
              sx={{ color: "green" }}
              aria-label="search"
            >
              <span className="material-symbols-outlined">search</span>
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ClientSearch;
