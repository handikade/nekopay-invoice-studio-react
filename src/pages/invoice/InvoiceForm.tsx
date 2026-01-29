import { Box, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import InvoiceFormFooter from "./components/forms/InvoiceFormFooter";
import InvoiceFormFrom from "./components/forms/InvoiceFormFrom";
import InvoiceFormGeneral from "./components/forms/InvoiceFormGeneral";
import InvoiceFormItems from "./components/forms/InvoiceFormItems";
import InvoiceFormTo from "./components/forms/InvoiceFormTo";

export type InvoiceFormProps = {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};

const InvoiceForm = ({ activeStep, setActiveStep }: InvoiceFormProps) => {
  const forms = [
    <InvoiceFormGeneral />,
    <InvoiceFormFrom />,
    <InvoiceFormTo />,
    <InvoiceFormItems />,
    <InvoiceFormFooter />,
  ];

  const safeStep = Math.min(Math.max(activeStep, 0), forms.length - 1);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {forms[safeStep]}
      </LocalizationProvider>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          disabled={activeStep === 0}
          onClick={() => setActiveStep(activeStep - 1)}
        >
          Back
        </Button>
        <Button
          variant="contained"
          disabled={activeStep === forms.length - 1}
          onClick={() => setActiveStep(activeStep + 1)}
        >
          Next
        </Button>
      </Box>
    </>
  );
};

export default InvoiceForm;
