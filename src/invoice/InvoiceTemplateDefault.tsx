import {
  Box,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { DeepPartial } from "react-hook-form";
import type { Invoice } from "./schema";

const invoiceTheme = createTheme({
  typography: {
    fontFamily: '"Merriweather", "Georgia", serif',
  },
});

type InvoiceTemplateDefaultProps = {
  invoice: DeepPartial<Invoice>;
};

const formatText = (value?: string) => {
  const normalized = value?.trim();
  return normalized && normalized.length > 0 ? normalized : "--";
};

const formatDate = (value: unknown) => {
  if (!value) {
    return "--";
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  }

  if (typeof value === "string") {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
    }
  }

  if (typeof (value as { format?: unknown }).format === "function") {
    return (value as { format: (format: string) => string }).format(
      "MMM DD, YYYY",
    );
  }

  return "--";
};

const formatCurrency = (value: number, currency?: string) => {
  const amount = Number.isFinite(value) ? value : 0;
  if (currency) {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
      }).format(amount);
    } catch {
      return `${amount.toFixed(2)} ${currency}`;
    }
  }

  return amount.toFixed(2);
};

const getAmount = (value: unknown) =>
  Number.isFinite(Number(value)) ? Number(value) : 0;

const InvoiceTemplateDefault = ({ invoice }: InvoiceTemplateDefaultProps) => {
  const items = invoice?.items ?? [];
  const currency = invoice?.currency ?? "";
  const subtotal = items.reduce((sum, item) => {
    const quantity = getAmount(item?.quantity);
    const price = getAmount(item?.price);
    return sum + quantity * price;
  }, 0);
  const total = subtotal;
  const footer = invoice?.footer;
  const signatureHeader =
    footer?.signatureTextHeader?.trim() || "Authorized Signature";
  const signatureFooter = footer?.signatureTextFooter?.trim() || "--";

  return (
    <ThemeProvider theme={invoiceTheme}>
      <Box
        sx={{
          backgroundColor: "#fff",
          p: 4,
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Invoice
            </Typography>
            <Typography color="text.secondary">
              Invoice No: {formatText(invoice?.invoiceNumber)}
            </Typography>
          </Box>
          <Box sx={{ minWidth: 220 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Issue Date
            </Typography>
            <Typography variant="body2">
              {formatDate(invoice?.issueDate)}
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              Due Date
            </Typography>
            <Typography variant="body2">
              {formatDate(invoice?.dueDate)}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              From
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {formatText(invoice?.from?.name)}
            </Typography>
            <Typography variant="body2">
              {formatText(invoice?.from?.address)}
            </Typography>
            <Typography variant="body2">
              Phone: {formatText(invoice?.from?.phone)}
            </Typography>
            <Typography variant="body2">
              Email: {formatText(invoice?.from?.email)}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Bill To
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {formatText(invoice?.to?.name)}
            </Typography>
            <Typography variant="body2">
              {formatText(invoice?.to?.address)}
            </Typography>
            <Typography variant="body2">
              Phone: {formatText(invoice?.to?.phone)}
            </Typography>
            <Typography variant="body2">
              Email: {formatText(invoice?.to?.email)}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ overflowX: "auto" }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#e2e8f0" }}>
                <TableCell>Description</TableCell>
                <TableCell align="right">Qty</TableCell>
                <TableCell align="right">Unit Price</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Typography color="text.secondary">
                      No items yet.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item, index) => {
                  const quantity = getAmount(item?.quantity);
                  const price = getAmount(item?.price);
                  const lineTotal = quantity * price;

                  return (
                    <TableRow key={item?.id ?? `${index}-row`}>
                      <TableCell>{formatText(item?.description)}</TableCell>
                      <TableCell align="right">
                        {Number.isFinite(quantity) ? quantity : 0}
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(price, currency)}
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(lineTotal, currency)}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Box sx={{ minWidth: 220 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Typography color="text.secondary">Subtotal</Typography>
              <Typography>{formatCurrency(subtotal, currency)}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                mt: 1,
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Total Due
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {formatCurrency(total, currency)}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Terms
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
              {formatText(footer?.terms)}
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ mt: 2 }}
            >
              Notes
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
              {formatText(footer?.notes)}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Typography variant="subtitle2" color="text.secondary">
              {signatureHeader}
            </Typography>
            <Box
              sx={{
                height: 64,
                mt: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderBottom: "1px solid #94a3b8",
              }}
            >
              {footer?.signatureURL ? (
                <Box
                  component="img"
                  src={footer.signatureURL}
                  alt="Signature"
                  sx={{
                    maxHeight: 56,
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Signature
                </Typography>
              )}
            </Box>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {signatureFooter}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default InvoiceTemplateDefault;
