import Stripe from "stripe";

export const getStripeClient = (stripeSecretkey: string | undefined) => {
  return new Stripe(stripeSecretkey || "", {
    apiVersion: "2025-04-30.basil",
  });
};
