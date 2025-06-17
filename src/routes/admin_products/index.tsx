import {
  $,
  component$,
  Resource,
  useResource$,
  useSignal,
} from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { productRow, productsContainer } from "./products.css";
import type { StripeProductType } from "~/shared/types";
import { ServerError } from "@builder.io/qwik-city/middleware/request-handler";
import { btn, btnHover, btnOrange, btnPink } from "~/shared/styles.css";
import { deleteProduct } from "../api/deleteProduct";
import { getStripeItems } from "../api/getStripeItems";

export default component$(() => {
  const localStripeProductsSignal = useSignal([]);

  const stripeProductsResource = useResource$<StripeProductType[]>(async () => {
    try {
      const stripeProducts = await getStripeItems();
      localStripeProductsSignal.value = stripeProducts;
      return stripeProducts;
    } catch (error) {
      throw new ServerError(500, error);
    }
  });

  const handleDeleteClick = $(async (product: StripeProductType) => {
    const confirmation = confirm(
      "Are you sure you want to delete this product? This cannot be undone."
    );

    if (confirmation) {
      try {
        await deleteProduct(product.id as string);
        localStripeProductsSignal.value =
          localStripeProductsSignal.value.filter(
            (p: StripeProductType) => p.id !== product.id
          );
      } catch (e) {
        console.log("Error deleting product", e);
      }
    }
  });

  return (
    <div class={productsContainer}>
      <Resource
        value={stripeProductsResource}
        onPending={() => <div>Loading...</div>}
        onRejected={(error) => <div>{error.message}</div>}
        onResolved={() =>
          localStripeProductsSignal.value.map((product: StripeProductType) => (
            <div key={product.id} class={productRow}>
              <p>{product.name}</p>
              <p>{product.description}</p>
              <p>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(product.price.unit_amount * 0.01)}
              </p>
              <button class={[btn, btnPink, btnHover]}>Update</button>
              <button
                class={[btn, btnOrange, btnHover]}
                onClick$={() => handleDeleteClick(product)}
              >
                Delete
              </button>
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
