import { component$, Resource, useSignal } from "@builder.io/qwik";
import {
  type DocumentHead,
  type RequestEventLoader,
  routeLoader$,
} from "@builder.io/qwik-city";
import ProductCard from "~/components/product-card";
import type { StripeProductType } from "~/shared/types";
import { ServerError } from "@builder.io/qwik-city/middleware/request-handler";
import { getStripeClient } from "~/shared/stripeClient";
import { DEFAULT_STRIPE_FILTER } from "~/shared/constants";
import setMapFromArr from "~/shared/utils/createMapFromArr";
import { formatProducts } from "~/shared/utils/formatProducts";

export const useStripeProducts = routeLoader$(
  async (requestEvent: RequestEventLoader) => {
    const stripe = getStripeClient(requestEvent.env.get("SECRET_STRIPE_KEY"));

    try {
      const productsReq = stripe.products.list(DEFAULT_STRIPE_FILTER);
      const pricesReq = stripe.prices.list(DEFAULT_STRIPE_FILTER);
      const [products, prices] = await Promise.all([productsReq, pricesReq]);
      const pricesMap = setMapFromArr(prices.data, "id");
      const formattedProducts = formatProducts(products.data, pricesMap);

      return formattedProducts;
    } catch (e) {
      throw new ServerError(500, e);
    }
  }
);

export default component$(() => {
  const stripeProducts = useStripeProducts();
  const localProducts = useSignal<StripeProductType[]>(
    stripeProducts.value as StripeProductType[]
  );

  return (
    <div class="flex justify-center flex-wrap gap-2 mt-2">
      <Resource
        value={stripeProducts}
        onPending={() => <div>Loading...</div>}
        onRejected={(error) => <div>{error.message}</div>}
        onResolved={() =>
          localProducts.value.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        }
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: "The Damaged Collective",
  meta: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      name: "description",
      content: "We sell skater owned products",
    },
    {
      name: "image",
      content:
        "https://res.cloudinary.com/geek-centric/image/upload/v1747081873/damaged_collective/output_zjor1f.jpg",
    },
    {
      property: "og:title",
      content: "The Damaged Collective",
    },
    {
      property: "og:description",
      content: "We sell skater owned skateboarding products",
    },
  ],
};
