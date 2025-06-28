import { server$ } from "@builder.io/qwik-city";
import { ServerError } from "@builder.io/qwik-city/middleware/request-handler";
import Stripe from "stripe";
import convertMoney from "~/shared/utils/convertMoney";

export const getProductById = server$(async function (productId: string) {
  try {
    const stripe = new Stripe(this.env.get("SECRET_STRIPE_KEY") || "", {
      apiVersion: "2025-04-30.basil",
    });

    const product = await stripe.products.retrieve(productId);
    const price = await stripe.prices.retrieve(product.default_price as string);

    const formattedPrice = convertMoney(price.unit_amount as number);

    return {
      ...product,
      formattedPrice,
      unformattedPrice: price.unit_amount,
    };
  } catch (error) {
    throw new ServerError(500, error);
  }
});
