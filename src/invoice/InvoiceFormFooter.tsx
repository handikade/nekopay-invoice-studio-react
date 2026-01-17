import { Grid, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import type { Invoice } from "./schema";

const InvoiceFormFooter = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Invoice>();

  return (
    <Grid
      container
      spacing={2}
      gridTemplateColumns="repeat(2, 1fr)"
      sx={{ p: 2 }}
    >
      <Grid size={12}>
        <Typography variant="h6">Footer</Typography>
      </Grid>
      <Grid size={6}>
        <TextField
          fullWidth
          label="Signature Header"
          variant="outlined"
          {...register("footer.signatureTextHeader")}
          error={!!errors.footer?.signatureTextHeader}
        />
      </Grid>
      <Grid size={6}>
        <TextField
          fullWidth
          label="Signature Footer"
          variant="outlined"
          {...register("footer.signatureTextFooter")}
          error={!!errors.footer?.signatureTextFooter}
        />
      </Grid>
      <Grid size={12}>
        <TextField
          fullWidth
          multiline
          label="Terms"
          variant="outlined"
          {...register("footer.terms")}
          error={!!errors.footer?.terms}
        />
      </Grid>
      <Grid size={12}>
        <TextField
          fullWidth
          multiline
          label="Notes"
          variant="outlined"
          {...register("footer.notes")}
          error={!!errors.footer?.notes}
        />
      </Grid>
    </Grid>
  );
};

export default InvoiceFormFooter;
