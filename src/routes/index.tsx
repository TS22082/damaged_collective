import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import ProductCard from "~/components/product-card";
import type { StripeProductType } from "~/shared/types";
import { ServerError } from "@builder.io/qwik-city/middleware/request-handler";
import { getStripeItems } from "../services/getStripeItems";

export default component$(() => {
  const stripeProductResource = useResource$<StripeProductType[]>(async () => {
    try {
      const stripeItems = await getStripeItems();
      return stripeItems;
    } catch (error) {
      throw new ServerError(500, error);
    }
  });

  return (
    <div class="flex justify-center flex-wrap gap-2 mt-2">
      <Resource
        value={stripeProductResource}
        onPending={() => <div>Loading...</div>}
        onRejected={(error) => <div>{error.message}</div>}
        onResolved={(products) => {
          if (!products.length) return <h1>There are no products</h1>;
          return products.map((product: StripeProductType) => (
            <ProductCard key={product.id} product={product} />
          ));
        }}
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
