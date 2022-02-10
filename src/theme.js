import { createTheme } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: purple[50],
    },
    secondary: {
      main: "#66549e",
    },
  },
  ansButtons: {
    backgroundColor: "#66549e",
    color: "white",
  },
  typography: {
    fontSize: 12,
  },
  spacing: 8,
});
