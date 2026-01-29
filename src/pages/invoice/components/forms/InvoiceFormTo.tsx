import { Grid, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import type { Invoice } from "./schema";

const InvoiceFormTo = () => {
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
        <Typography variant="h6">To</Typography>
      </Grid>
      <Grid size={12}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          {...register("to.name")}
          error={!!errors.to?.name}
        />
      </Grid>
      <Grid size={6}>
        <TextField
          fullWidth
          label="Phone"
          variant="outlined"
          {...register("to.phone")}
          error={!!errors.to?.phone}
        />
      </Grid>
      <Grid size={6}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          {...register("to.email")}
          error={!!errors.to?.email}
        />
      </Grid>
      <Grid size={12}>
        <TextField
          fullWidth
          label="Address"
          variant="outlined"
          multiline
          {...register("to.address")}
          error={!!errors.to?.address}
        />
      </Grid>
    </Grid>
  );
};

export default InvoiceFormTo;
