import {
  invoiceSchema,
  type Invoice,
} from "@handikade/nekopay-invoice-studio-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import InvoiceForm from "./InvoiceForm";
import InvoiceTemplateDefault from "./InvoiceTemplateDefault";

const glassCardSx = {
  flexGrow: 1,
  backgroundColor: "rgba(255, 255, 255, 0.4)",
  border: "1px solid rgba(255, 255, 255, 0.6)",
  boxShadow: "0 12px 30px rgba(8, 20, 40, 0.2)",
  backdropFilter: "blur(18px) saturate(140%)",
  borderRadius: "20px",
};

const InvoicePreviewPanel = () => {
  const { control } = useFormContext<Invoice>();
  const invoice = useWatch({ control });

  return <InvoiceTemplateDefault invoice={invoice} />;
};

const InvoicePage = () => {
  const methods = useForm<Invoice>({
    resolver: zodResolver(invoiceSchema),
  });
  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        flexGrow: 1,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <FormProvider {...methods}>
            <Grid container spacing={2} alignItems="stretch">
              <Grid size={{ xs: 12, md: 5 }} sx={{ display: "flex" }}>
                <Card sx={glassCardSx}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Invoice Editor
                    </Typography>
                    {/* <Typography color="text.secondary">
                    Add form fields here.
                  </Typography> */}
                    <InvoiceForm />
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, md: 7 }} sx={{ display: "flex" }}>
                <Card sx={glassCardSx}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Preview
                    </Typography>
                    {/* <Typography color="text.secondary">
                    Render the invoice preview here.
                  </Typography> */}
                    <InvoicePreviewPanel />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </FormProvider>
        </Box>
      </Container>
    </Box>
  );
};

export default InvoicePage;
