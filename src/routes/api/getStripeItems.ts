import { server$ } from "@builder.io/qwik-city";
import { ServerError } from "@builder.io/qwik-city/middleware/request-handler";
import Stripe from "stripe";
import { DEFAULT_STRIPE_FILTER } from "~/shared/constants";
import createMapFromArr from "~/shared/utils/createMapFromArr";
import { formatProducts } from "~/shared/utils/formatProducts";

export const getStripeItems = server$(async function () {
  const stripe = new Stripe(this.env.get("SECRET_STRIPE_KEY") || "", {
    apiVersion: "2025-04-30.basil",
  });

  try {
    const productsReq = stripe.products.list(DEFAULT_STRIPE_FILTER);
    const pricesReq = stripe.prices.list(DEFAULT_STRIPE_FILTER);

    const [products, prices] = await Promise.all([productsReq, pricesReq]);

    const pricesMap = createMapFromArr(prices.data, "id");
    const formattedProducts = formatProducts(products.data, pricesMap);

    return formattedProducts;
  } catch (error) {
    throw new ServerError(5000, error);
  }
});
