import { server$ } from "@builder.io/qwik-city";
import { ServerError } from "@builder.io/qwik-city/middleware/request-handler";
import { getStripeClient } from "~/shared/stripeClient";

export const getStripeProductsById = server$(async function (ids: string[]) {
  const stripe = await getStripeClient(this.env.get("SECRET_STRIPE_KEY") || "");

  try {
    const products = await stripe.products.list({
      ids,
    });

    return products.data;
  } catch (error) {
    new ServerError(500, error);
  }
});
