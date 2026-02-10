import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "rgba(52, 71, 170, 0.87)" },
    secondary: { main: "rgba(246, 227, 231, 0.84)" },
  },

  typography: {
    fontFamily: "inherit",
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { fontSize: "16px" },
        body: { fontSize: "16px" },
      },
    },
  },
});

export default theme;
