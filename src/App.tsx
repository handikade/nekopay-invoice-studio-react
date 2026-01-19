import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles";
import * as React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InvoicePage from "./pages/invoice/InvoicePage";

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
          <CssBaseline />
          <HashRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/studio" element={<InvoicePage />} />
            </Routes>
          </HashRouter>
        </ThemeProvider>
      </StyledEngineProvider>
    </React.StrictMode>
  );
}

export default App;
