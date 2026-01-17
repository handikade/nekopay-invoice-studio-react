import { Grid, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import type { Invoice } from "./schema";

const InvoiceFormFrom = () => {
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
        <Typography variant="h6">From</Typography>
      </Grid>
      <Grid size={12}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          {...register("from.name")}
          error={!!errors.from?.name}
        />
      </Grid>
      <Grid size={6}>
        <TextField
          fullWidth
          label="Phone"
          variant="outlined"
          {...register("from.phone")}
          error={!!errors.from?.phone}
        />
      </Grid>
      <Grid size={6}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          {...register("from.email")}
          error={!!errors.from?.email}
        />
      </Grid>
      <Grid size={12}>
        <TextField
          fullWidth
          label="Address"
          variant="outlined"
          multiline
          {...register("from.address")}
          error={!!errors.from?.address}
        />
      </Grid>
    </Grid>
  );
};

export default InvoiceFormFrom;
