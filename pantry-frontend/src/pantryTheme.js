import { createTheme } from "@mui/material/styles";

const pantryTheme = createTheme({
  palette: {
    primary: {
      light: "#70c299",
      main: "#4db380",
      dark: "#357d59",
      contrastText: "#fff",
    },
    secondary: {
      light: "#c27099",
      main: "#b34d80",
      dark: "#7d3559",
      contrastText: "#000",
    },
  },
});

export default pantryTheme;
