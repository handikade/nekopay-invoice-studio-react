import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import InvoiceItem from "./InvoiceItem";

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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {fields.length === 0 ? (
        <Typography color="text.secondary">
          No items yet. Add your first item below.
        </Typography>
      ) : null}
      {fields.map((field, index) => (
        <InvoiceItem
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
  );
};

export default InvoiceItems;
