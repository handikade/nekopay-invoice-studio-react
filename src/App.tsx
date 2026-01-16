import {
  invoiceSchema,
  type Invoice,
} from "@handikade/nekopay-invoice-studio-schema";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { z } from "zod";
import top100Films from "./top100films";

const invoice: Invoice = {
  billFrom: {
    address: "asdfasdf",
    email: "dika@gmail.com",
    name: "dika",
    phone: "23412341234",
  },
  billTo: {
    address: "qwerqwe sfdgsg",
    email: "sadsgf@asdfdf.id",
    name: "",
    phone: "adfasdf",
  },
  currency: "IDR",
  dueDate: new Date(),
  id: "asdfasdf",
  invoiceNumber: "asdfasdf",
  issueDate: new Date(),
  items: [
    {
      description: "asdfasdf",
      id: "asdfasdf",
      price: 0,
      quantity: 0,
    },
  ],
  signatureTextFooter: "asdf",
  signatureTextHeader: "asdf",
  signatureURL: "asdfasdf",
};

try {
  invoiceSchema.parse(invoice);
} catch (error) {
  console.log(z.treeifyError(error));
}

function App() {
  return (
    <React.Fragment>
      <CssBaseline></CssBaseline>
      <Button variant="contained">Hello world</Button>
      <hr></hr>
      <Autocomplete
        disablePortal
        options={top100Films}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />
    </React.Fragment>
  );
}

export default App;
