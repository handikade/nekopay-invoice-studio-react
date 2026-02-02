import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useCallback, useRef, useState } from "react";
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import InvoiceForm from "./InvoiceForm";
import InvoicePreviewer from "./InvoicePreviewer";
import InvoiceWizardHeader from "./components/InvoiceWizardHeader";
import InvoiceTemplateDefault from "./components/templates/InvoiceTemplateDefault";
import { downloadPdf } from "./pdf";
import { invoiceSchema, type Invoice } from "./schema";

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

// const issueDate = new Date().toISOString;
// const dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1_000).toISOString;

const InvoicePage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const methods = useForm<Invoice>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      from: {
        address:
          "Jl. Johar Baru Utara VI No. 19, RT 08 / RW 05, Johar Baru, Jakarta Pusat, 10560",
        email: "dika.csui@gmail.com",
        name: "Dika Handika",
        phone: "08988945464",
      },
      to: {
        address:
          "Jl. Komplek Bulog Blok C No. 28, RT 06 / RW 06, Pulo Gadung, Jakarta TImur, 10322",
        email: "asep.show@gmail.com",
        name: "Asep Show",
        phone: "08988945464",
      },
      currency: "IDR",
      issueDate: new Date(),
      dueDate: new Date(),
      id: "123412341234",
      invoiceNumber: "INV/2026/01/001",
      items: [
        {
          description: "Susu Segar",
          discount: 10,
          discountType: "percentage",
          id: "item-001",
          price: 10000,
          quantity: 10,
        },
        {
          description: "Indomie Goreng",
          discount: 5000,
          discountType: "fixed",
          id: "item-002",
          price: 3500,
          quantity: 40,
        },
      ],
      footer: {
        notes:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        terms:
          "Aenean egestas suscipit feugiat. Ut luctus nibh id cursus dapibus. Nam suscipit risus at dui.",
        signatureTextHeader: "Hormat Kami",
        signatureURL: undefined,
        signatureTextFooter: "Finance",
      },
    },
  });
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = useCallback(async () => {
    const previewElement = previewRef.current;
    if (!previewElement) {
      return;
    }
    await downloadPdf(previewElement);
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <InvoiceWizardHeader
        steps={[
          "Umum",
          "Tagihan Dari",
          "Tagihan Untuk",
          "Item Tagihan",
          "Lainnya",
        ]}
        activeStep={activeStep}
      ></InvoiceWizardHeader>

      <Container maxWidth="lg">
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <FormProvider {...methods}>
            <Grid container spacing={2} alignItems="flex-start">
              <Grid size={{ xs: 12, md: 5 }} sx={{ display: "flex" }}>
                <Card sx={glassCardSx}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Invoice Editor
                    </Typography>
                    <InvoiceForm
                      setActiveStep={setActiveStep}
                      activeStep={activeStep}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, md: 7 }} sx={{ display: "flex" }}>
                <Card sx={glassCardSx}>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                        mb: 2,
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography variant="h6">Preview</Typography>
                      <Button variant="contained" onClick={handleDownloadPdf}>
                        Download PDF
                      </Button>
                    </Box>
                    <InvoicePreviewer>
                      <Box
                        ref={previewRef}
                        data-invoice-preview-root="true"
                        sx={{ backgroundColor: "#ffffff" }}
                      >
                        <InvoicePreviewPanel />
                      </Box>
                    </InvoicePreviewer>
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
