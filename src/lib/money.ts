/** Money is stored and computed as integer cents. Format only at the edges. */

export function formatCents(cents: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

/** PayPal expects a fixed-2-decimal string, e.g. 2400 -> "24.00". */
export function centsToPayPalValue(cents: number): string {
  return (cents / 100).toFixed(2);
}

/** Parse a PayPal "24.00" value back to integer cents, rounding safely. */
export function payPalValueToCents(value: string): number {
  return Math.round(parseFloat(value) * 100);
}
