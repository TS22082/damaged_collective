import { component$, Resource, useSignal } from "@builder.io/qwik";
import {
  type DocumentHead,
  type RequestEventLoader,
  routeLoader$,
} from "@builder.io/qwik-city";
import ProductCard from "~/components/product-card";
import type {
  StripePriceType,
  StripeProductType,
  StripMetadataType,
} from "~/shared/types";

import { ServerError } from "@builder.io/qwik-city/middleware/request-handler";
import { getStripeClient } from "~/shared/stripeClient";

export const useStripeProducts = routeLoader$(
  async (requestEvent: RequestEventLoader) => {
    const stripe = getStripeClient(requestEvent.env.get("SECRET_STRIPE_KEY"));

    try {
      const productsReq = stripe.products.list({
        limit: 100,
        active: true,
      });

      const pricesReq = stripe.prices.list({
        limit: 100,
        active: true,
      });

      const [products, prices] = await Promise.all([productsReq, pricesReq]);

      const pricesMap = new Map<string, StripePriceType>();

      prices.data.forEach((price) => {
        pricesMap.set(price.id as string, {
          id: price.id as string,
          product: price.product as string,
          currency: price.currency as string,
          unit_amount: price.unit_amount as number,
        });
      });

      return products.data.map((product) => ({
        id: product.id as string,
        name: product.name as string,
        description: product.description as string,
        images: product.images as string[],
        price: pricesMap.get(product.default_price as string),
        default_price: product.default_price as string,
        metadata: product.metadata as StripMetadataType,
      }));
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
