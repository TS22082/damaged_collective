/**
 * Converts a monetary amount from cents to a formatted USD currency string.
 *
 * @param amount - The amount in cents (e.g., 1234 for $12.34)
 * @returns A formatted currency string in USD format (e.g., "$12.34")
 *
 * @example
 * convertMoney(1234); // Returns "$12.34"
 * convertMoney(50); // Returns "$0.50"
 * convertMoney(0); // Returns "$0.00"
 */

const convertMoney = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount * 0.01);
};

export default convertMoney;
