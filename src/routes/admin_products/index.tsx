import { component$, Resource } from "@builder.io/qwik";
import {
  type RequestEventLoader,
  routeLoader$,
  type DocumentHead,
} from "@builder.io/qwik-city";
import { productRow, productsContainer } from "./products.css";
import type { StripeProductType } from "~/shared/types";
import { getStripeClient } from "~/shared/stripeClient";
import { DEFAULT_STRIPE_FILTER } from "~/shared/constants";
import createMapFromArr from "~/shared/utils/createMapFromArr";
import { formatProducts } from "~/shared/utils/formatProducts";
import { ServerError } from "@builder.io/qwik-city/middleware/request-handler";

export const useStripeProducts = routeLoader$(
  async (requestEvent: RequestEventLoader) => {
    const stripe = getStripeClient(requestEvent.env.get("SECRET_STRIPE_KEY"));

    try {
      const productsReq = stripe.products.list(DEFAULT_STRIPE_FILTER);
      const pricesReq = stripe.prices.list(DEFAULT_STRIPE_FILTER);

      const [products, prices] = await Promise.all([productsReq, pricesReq]);
      const pricesMap = createMapFromArr(prices.data, "id");
      const formattedProducts = formatProducts(products.data, pricesMap);

      return formattedProducts;
    } catch (e) {
      throw new ServerError(500, e);
    }
  }
);

export default component$(() => {
  const stripeProducts = useStripeProducts(); // work?

  console.log("stripeProducts", stripeProducts.value);

  return (
    <div class={productsContainer}>
      <Resource
        value={stripeProducts}
        onPending={() => <div>Loading...</div>}
        onRejected={(error) => <div>{error.message}</div>}
        onResolved={() =>
          stripeProducts.value.map((product: StripeProductType) => (
            <div key={product.id} class={productRow}>
              <p>{product.name}</p>
              <p>{product.description}</p>
              <p>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(product.price.unit_amount * 0.01)}
              </p>
            </div>
          ))
        }
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Admin Products",
  meta: [
    {
      name: "description",
      content: "Admin Products",
    },
  ],
};
