import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useFormContext, useWatch } from "react-hook-form";

const glassCardSx = {
  flexGrow: 1,
  backgroundColor: "rgba(255, 255, 255, 0)",
  border: "1px solid rgba(255, 255, 255, 0.5)",
  boxShadow: "0 12px 30px rgba(8, 20, 40, 0.2)",
  backdropFilter: "blur(18px) saturate(140%)",
  borderRadius: "10px",
};

const discountTypeOptions = [
  { value: "percentage", label: "%" },
  { value: "fixed", label: "#" },
];

export type InvoiceFormItemProps = {
  index: number;
  onRemove: (index: number) => void;
  autoFocus?: boolean;
};

const InvoiceFormItem = ({
  index,
  onRemove,
  autoFocus,
}: InvoiceFormItemProps) => {
  const { control, register, setValue } = useFormContext();
  const quantity = useWatch({
    control,
    name: `items.${index}.quantity`,
    defaultValue: 0,
  });
  const price = useWatch({
    control,
    name: `items.${index}.price`,
    defaultValue: 0,
  });
  const discount = useWatch({
    control,
    name: `items.${index}.discount`,
    defaultValue: 0,
  });
  const discountType = useWatch({
    control,
    name: `items.${index}.discountType`,
    defaultValue: "",
  });

  const subTotal = quantity * price;
  const discountAmount =
    discountType === "percentage" ? subTotal * (discount / 100) : discount;

  const grandTotal = subTotal - discountAmount;
  const totalLabel = Number.isFinite(grandTotal)
    ? grandTotal.toFixed(2)
    : "0.00";

  const handleDiscountTypeChange = () => {
    setValue(`items.${index}.discount`, 0, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <Card sx={glassCardSx}>
      <CardContent>
        <input type="hidden" {...register(`items.${index}.id`)} />
        {/* ROW I */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextField
              autoFocus={autoFocus}
              fullWidth
              label="Deskripsi"
              variant="outlined"
              {...register(`items.${index}.description`)}
            />
          </Grid>
          {/* end of ROW I */}

          {/* ROW II */}
          <Grid size={{ xs: 6, md: 6 }}>
            <TextField
              fullWidth
              label="Qty"
              type="number"
              variant="outlined"
              slotProps={{ htmlInput: { min: 1, step: 1 } }}
              {...register(`items.${index}.quantity`, { valueAsNumber: true })}
            />
          </Grid>
          <Grid size={{ xs: 6, md: 6 }}>
            <TextField
              fullWidth
              label="Price"
              type="number"
              variant="outlined"
              slotProps={{ htmlInput: { min: 0, step: "0.01" } }}
              {...register(`items.${index}.price`, { valueAsNumber: true })}
            />
          </Grid>
          {/* end of ROW II */}

          {/* ROW III */}
          <Grid size={{ xs: 6, md: 6 }}>
            <Controller
              name={`items.${index}.discountType`}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label="Tipe Diskon"
                  value={field.value ?? ""}
                  onChange={(event) => {
                    field.onChange(event);
                    handleDiscountTypeChange();
                  }}
                  slotProps={{
                    inputLabel: { shrink: true },
                    select: {
                      displayEmpty: true,
                      renderValue: (selectedValue) => {
                        const selected = discountTypeOptions.find(
                          (option) => option.value === selectedValue,
                        );

                        if (!selected) {
                          return (
                            <Typography color="text.secondary">
                              Pilih
                            </Typography>
                          );
                        }

                        return (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Typography>{selected.label}</Typography>
                          </Box>
                        );
                      },
                    },
                  }}
                >
                  {discountTypeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <Typography>
                        {option.label} ({option.value})
                      </Typography>
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid size={{ xs: 6, md: 6 }}>
            <TextField
              fullWidth
              label="Nilai Diskon"
              type="number"
              variant="outlined"
              slotProps={{ htmlInput: { min: 0, step: "0.01" } }}
              {...register(`items.${index}.discount`, { valueAsNumber: true })}
            />
          </Grid>
          {/* end of ROW III */}
        </Grid>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <Typography variant="subtitle2">Item total: {totalLabel}</Typography>
          <Button
            color="error"
            startIcon={<DeleteOutlineIcon />}
            onClick={() => onRemove(index)}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InvoiceFormItem;
