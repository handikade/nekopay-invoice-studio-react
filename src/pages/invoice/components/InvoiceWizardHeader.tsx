import { Box, Card, Step, StepLabel, Stepper } from "@mui/material";

export type InvoiceWizardHeaderProps = {
  activeStep: number;
  steps: string[];
};

const InvoiceWizardHeader = ({
  activeStep,
  steps,
}: InvoiceWizardHeaderProps) => {
  return (
    <Box sx={{ width: "100%", mb: 4 }}>
      <Card sx={{ p: 2 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Card>
    </Box>
  );
};

export default InvoiceWizardHeader;
