import { component$, Resource } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

import ProductCard from "~/components/product-card";

import { productsContainer } from "./products.css";
import { useStripeProducts } from "..";
import type { StripeProductType } from "~/shared/types";
export { useStripeProducts } from "..";

export default component$(() => {
  const stripeProducts = useStripeProducts();

  return (
    <div class={productsContainer}>
      <Resource
        value={stripeProducts}
        onPending={() => <div>Loading...</div>}
        onRejected={(error) => <div>{error.message}</div>}
        onResolved={() =>
          stripeProducts.value.map((product: StripeProductType) => (
            <ProductCard key={product.id} product={product} />
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
