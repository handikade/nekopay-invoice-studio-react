import Divider from "@mui/material/Divider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import InvoiceFormFooter from "./InvoiceFormFooter";
import InvoiceFormFrom from "./InvoiceFormFrom";
import InvoiceFormGeneral from "./InvoiceFormGeneral";
import InvoiceFormItems from "./InvoiceFormItems";
import InvoiceFormTo from "./InvoiceFormTo";

const InvoiceForm = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <InvoiceFormGeneral />
      <Divider />
      <InvoiceFormFrom />
      <Divider />
      <InvoiceFormTo />
      <Divider />
      <InvoiceFormItems />
      <Divider />
      <InvoiceFormFooter />
    </LocalizationProvider>
  );
};

export default InvoiceForm;
