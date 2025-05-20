import { component$, useSignal } from "@builder.io/qwik";
import {
  type JSONObject,
  type DocumentHead,
  type RequestEventLoader,
  type RequestEventAction,
  routeAction$,
  routeLoader$,
} from "@builder.io/qwik-city";
import ProductCard from "~/components/product-card";
import { $ } from "@builder.io/qwik";
import type { StripeProductType, StripMetadataType } from "~/types";
import { deleteProduct } from "~/server/deleteProduct";
import { type Session } from "@auth/qwik";
import Stripe from "stripe";
import { ServerError } from "@builder.io/qwik-city/middleware/request-handler";

export const useStripeProducts = routeLoader$(
  async (requestEvent: RequestEventLoader) => {
    const stripe = new Stripe(requestEvent.env.get("SECRET_STRIPE_KEY") || "", {
      apiVersion: "2025-04-30.basil",
    });

    try {
      const products = await stripe.products.list();

      return products.data.map((product) => ({
        id: product.id as string,
        name: product.name as string,
        images: product.images as string[],
        metadata: product.metadata as StripMetadataType,
      }));
    } catch (e) {
      throw new ServerError(500, e);
    }
  }
);

// TODO: This needs a validator
export const useUpdateDbItem = routeAction$(
  async (data: JSONObject, requestEvent: RequestEventAction) => {
    try {
      const session: Session | null = requestEvent.sharedMap.get("session");

      if (!session || session.user?.email !== "ts22082@gmail.com") {
        throw new ServerError(401, "Not authorized");
      }

      const stripe = new Stripe(
        requestEvent.env.get("SECRET_STRIPE_KEY") || "",
        {
          apiVersion: "2025-04-30.basil",
        }
      );

      await stripe.products.update(data.id as string, {
        name: data.name as string,
      });

      return { success: true };
    } catch (error) {
      console.log("This is the error", error);
      throw new ServerError(500, error);
    }
  }
);

export default component$(() => {
  const stripeProducts = useStripeProducts();
  const localProducts = useSignal<StripeProductType[]>(stripeProducts.value);
  const handleUpdate = useUpdateDbItem();

  const handleUiUpdate = $((product: StripeProductType) => {
    localProducts.value = localProducts.value.map((p) => {
      if (p.id === product.id) {
        return product;
      }
      return p;
    });
  });

  const handleDelete = $(async (id: string) => {
    try {
      await deleteProduct(id);
      localProducts.value = localProducts.value.filter((p) => p.id !== id);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <div class="flex justify-center flex-wrap gap-2 mt-2">
        {localProducts.value.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            handleUiUpdate={handleUiUpdate}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "The Damaged Collective",
  meta: [
    {
      name: "Damaged Collective home page",
      content: "We sell skater owned skateboarding products",
    },
  ],
};
