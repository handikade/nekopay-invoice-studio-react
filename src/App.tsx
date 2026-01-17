import CssBaseline from "@mui/material/CssBaseline";
import { StyledEngineProvider } from "@mui/material/styles";
import * as React from "react";
import InvoicePage from "./invoice/InvoicePage";

function App() {
  return (
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <CssBaseline></CssBaseline>
        <InvoicePage></InvoicePage>
      </StyledEngineProvider>
    </React.StrictMode>
  );
}

export default App;
