import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormContext, useWatch } from "react-hook-form";

const glassCardSx = {
  flexGrow: 1,
  backgroundColor: "rgba(255, 255, 255, 0)",
  border: "1px solid rgba(255, 255, 255, 0.5)",
  boxShadow: "0 12px 30px rgba(8, 20, 40, 0.2)",
  backdropFilter: "blur(18px) saturate(140%)",
  borderRadius: "10px",
};

type InvoiceItemProps = {
  index: number;
  onRemove: (index: number) => void;
  autoFocus?: boolean;
};

const InvoiceItem = ({ index, onRemove, autoFocus }: InvoiceItemProps) => {
  const { control, register } = useFormContext();
  const quantity = useWatch({
    control,
    name: `items.${index}.quantity`,
  });
  const price = useWatch({
    control,
    name: `items.${index}.price`,
  });
  const total = (Number(quantity) || 0) * (Number(price) || 0);
  const totalLabel = Number.isFinite(total) ? total.toFixed(2) : "0.00";

  return (
    <Card sx={glassCardSx}>
      <CardContent>
        <input type="hidden" {...register(`items.${index}.id`)} />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              autoFocus={autoFocus}
              fullWidth
              label="Description"
              variant="outlined"
              {...register(`items.${index}.description`)}
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <TextField
              fullWidth
              label="Quantity"
              type="number"
              variant="outlined"
              slotProps={{ htmlInput: { min: 1, step: 1 } }}
              {...register(`items.${index}.quantity`, { valueAsNumber: true })}
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <TextField
              fullWidth
              label="Price"
              type="number"
              variant="outlined"
              slotProps={{ htmlInput: { min: 0, step: "0.01" } }}
              {...register(`items.${index}.price`, { valueAsNumber: true })}
            />
          </Grid>
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

export default InvoiceItem;
