import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import type { Dayjs } from "dayjs";
import { Controller, useFormContext } from "react-hook-form";
import InvoiceItems from "./InvoiceItems";

const currencyOptions = [
  { label: "Rupiah", value: "IDR", flagCode: "id" },
  { label: "Dollar", value: "USD", flagCode: "us" },
  { label: "Ringgit", value: "MYR", flagCode: "my" },
];

const getFlagUrl = (flagCode: string) =>
  `https://flagcdn.com/w20/${flagCode}.png`;

const InvoiceForm = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid
        container
        spacing={2}
        gridTemplateColumns="repeat(2, 1fr)"
        sx={{ p: 2 }}
      >
        <Grid size={12}>
          <Typography variant="h6">General</Typography>
        </Grid>
        <Grid size={12}>
          <TextField
            id="invoice-number"
            fullWidth
            label="Invoice Number"
            variant="outlined"
            {...register("invoiceNumber")}
            error={!!errors.invoiceNumber}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            name="issueDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Issue Date"
                value={field.value as Dayjs}
                onChange={(v) => field.onChange(v)}
                slotProps={{
                  textField: {
                    error: !!errors.issueDate,
                    helperText: "",
                    fullWidth: true,
                  },
                }}
              />
            )}
          />
        </Grid>
        <Grid size={6}>
          <Controller
            name="dueDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Due Date"
                value={field.value as Dayjs}
                onChange={(v) => field.onChange(v)}
                slotProps={{
                  textField: {
                    error: !!errors.dueDate,
                    helperText: "",
                    fullWidth: true,
                  },
                }}
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <Controller
            name="currency"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                fullWidth
                label="Currency"
                value={field.value ?? ""}
                error={!!errors.currency}
                slotProps={{
                  inputLabel: { shrink: true },
                  select: {
                    displayEmpty: true,
                    renderValue: (selectedValue) => {
                      const selected = currencyOptions.find(
                        (option) => option.value === selectedValue
                      );

                      if (!selected) {
                        return (
                          <Typography color="text.secondary">
                            Select currency
                          </Typography>
                        );
                      }

                      return (
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Box
                            component="img"
                            src={getFlagUrl(selected.flagCode)}
                            alt={`${selected.label} flag`}
                            loading="lazy"
                            sx={{
                              width: 20,
                              height: 14,
                              borderRadius: "2px",
                              objectFit: "cover",
                            }}
                          />
                          <Typography>
                            {selected.label} ({selected.value})
                          </Typography>
                        </Box>
                      );
                    },
                  },
                }}
              >
                {currencyOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box
                      component="img"
                      src={getFlagUrl(option.flagCode)}
                      alt={`${option.label} flag`}
                      loading="lazy"
                      sx={{
                        width: 20,
                        height: 14,
                        borderRadius: "2px",
                        objectFit: "cover",
                        mr: 1,
                      }}
                    />
                    <Typography>
                      {option.label} ({option.value})
                    </Typography>
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
      </Grid>

      <Divider />

      <Grid
        container
        spacing={2}
        gridTemplateColumns="repeat(2, 1fr)"
        sx={{ p: 2 }}
      >
        <Grid size={12}>
          <Typography variant="h6">Bill From</Typography>
        </Grid>
        <Grid size={12}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            {...register("billFrom.name")}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            fullWidth
            label="Phone"
            variant="outlined"
            {...register("billFrom.phone")}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            {...register("billFrom.email")}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            fullWidth
            label="Address"
            variant="outlined"
            multiline
            {...register("billFrom.address")}
          />
        </Grid>
      </Grid>

      <Divider />

      <Grid
        container
        spacing={2}
        gridTemplateColumns="repeat(2, 1fr)"
        sx={{ p: 2 }}
      >
        <Grid size={12}>
          <Typography variant="h6">Bill To</Typography>
        </Grid>
        <Grid size={12}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            {...register("billTo.name")}
          />
        </Grid>

        <Grid size={6}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            {...register("billTo.email")}
          />
        </Grid>

        <Grid size={6}>
          <TextField
            fullWidth
            label="Phone"
            variant="outlined"
            {...register("billTo.phone")}
          />
        </Grid>

        <Grid size={12}>
          <TextField
            fullWidth
            label="Address"
            multiline
            variant="outlined"
            {...register("billTo.address")}
          />
        </Grid>
      </Grid>

      <Divider />

      <Grid
        container
        spacing={2}
        gridTemplateColumns="repeat(2, 1fr)"
        sx={{ p: 2 }}
      >
        <Grid size={12}>
          <Typography variant="h6">Items</Typography>
        </Grid>
        <Grid size={12}>
          <InvoiceItems />
        </Grid>
      </Grid>

      <Divider />

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
            {...register("signatureTextHeader")}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            fullWidth
            label="Signature Footer"
            variant="outlined"
            {...register("signatureTextFooter")}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default InvoiceForm;
