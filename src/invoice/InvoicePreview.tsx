import { useFormContext, useWatch } from "react-hook-form";

const InvoicePreview = () => {
  const { control } = useFormContext();
  const watchedValue = useWatch({ control });

  return (
    <pre>
      <code>{JSON.stringify(watchedValue, null, 2)}</code>
    </pre>
  );
};

export default InvoicePreview;
