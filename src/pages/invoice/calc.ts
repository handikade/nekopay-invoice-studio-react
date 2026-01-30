// Common calculation (most typical)

// If the discount is applied before tax:
// - Subtotal = sum of line items (pre-tax)
// - Discount = Subtotal × discount rate (or a fixed amount)
// - Taxable amount = Subtotal − Discount
// - Tax = Taxable amount × tax rate
// - Grand total = (Subtotal − Discount) + Tax (+ shipping/fees if any)

// Quick example
// - Items subtotal: 1,000
// - Discount: 10% → 100
// - Tax (say 11%) on 900 → 99
// - Grand total = 900 + 99 = 999

// One important gotcha
// Some invoices show “Subtotal” after line-item discounts (or after an invoice-level discount). So if you’re matching numbers, check whether the invoice defines subtotal as:
// - Pre-discount subtotal, or
// - Net subtotal (after discounts, before tax)

export function calculateItemSubTotal(itemPrice: number, itemQuantity: number) {
  return itemPrice * itemQuantity;
}

export function calculateDiscountAmount(
  subTotal: number,
  discountValue: number,
  discountType: string = "percentage",
) {
  return discountType === "percentage"
    ? subTotal * (discountValue / 100)
    : discountValue;
}

export function calculateGrandTotal(
  subTotal: number,
  discountAmount: number,
  taxAmount: number = 0,
) {
  return subTotal - discountAmount + taxAmount;
}
