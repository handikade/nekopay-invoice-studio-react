import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles";
import * as React from "react";
import InvoicePage from "./invoice/InvoicePage";

const theme = createTheme({
  typography: {
    fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline></CssBaseline>
          <InvoicePage></InvoicePage>
        </ThemeProvider>
      </StyledEngineProvider>
    </React.StrictMode>
  );
}

export default App;
