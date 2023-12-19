export const formatNumericValue = (numericValue: number): string =>
  numericValue.toLocaleString(undefined, { maximumFractionDigits: 6 })
