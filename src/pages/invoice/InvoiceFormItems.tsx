import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import InvoiceFormItem from "./InvoiceFormItem";

const createItemId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
};

const InvoiceItems = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
    keyName: "fieldKey",
  });
  const [autoFocusIndex, setAutoFocusIndex] = useState<number | null>(null);

  const handleAddItem = () => {
    const nextIndex = fields.length;
    append({
      id: createItemId(),
      description: "",
      quantity: 1,
      price: 0,
    });
    setAutoFocusIndex(nextIndex);
  };

  return (
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {fields.length === 0 ? (
            <Typography color="text.secondary">
              No items yet. Add your first item below.
            </Typography>
          ) : null}
          {fields.map((field, index) => (
            <InvoiceFormItem
              key={field.fieldKey}
              index={index}
              onRemove={remove}
              autoFocus={autoFocusIndex === index}
            />
          ))}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" onClick={handleAddItem}>
              Add Item
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default InvoiceItems;
