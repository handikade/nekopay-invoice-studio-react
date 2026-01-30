export function sanitizeNumber(value: unknown): number {
  const coerced = Number(value);
  return Number.isFinite(coerced) ? coerced : 0;
}

export function formatText(value?: string) {
  const normalized = value?.trim();
  return normalized && normalized.length > 0 ? normalized : "--";
}

export function formatDate(value: unknown) {
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
}

export function formatCurrency(value: number, currency?: string) {
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
}

export function getDiscountView(
  discount: number,
  currency: string,
  discountType: "fixed" | "percentage" = "percentage",
): string {
  return discountType === "fixed" ? `${currency} ${discount}` : `${discount}%`;
}
