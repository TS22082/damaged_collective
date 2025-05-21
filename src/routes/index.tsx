import { component$, Resource, useSignal } from "@builder.io/qwik";
import {
  type JSONObject,
  type DocumentHead,
  type RequestEventLoader,
  type RequestEventAction,
  routeAction$,
  routeLoader$,
  validator$,
} from "@builder.io/qwik-city";
import ProductCard from "~/components/product-card";
import { $ } from "@builder.io/qwik";
import type { StripeProductType, StripMetadataType } from "~/types";
import { deleteProduct } from "~/routes/api/deleteProduct";
import Stripe from "stripe";
import {
  type RequestEvent,
  ServerError,
} from "@builder.io/qwik-city/middleware/request-handler";

export const useStripeProducts = routeLoader$(
  async (requestEvent: RequestEventLoader) => {
    const stripe = new Stripe(requestEvent.env.get("SECRET_STRIPE_KEY") || "", {
      apiVersion: "2025-04-30.basil",
    });

    try {
      const products = await stripe.products.list({
        limit: 100,
        active: true,
      });

      return products.data.map((product) => ({
        id: product.id as string,
        name: product.name as string,
        images: product.images as string[],
        default_price: product.default_price as string,
        metadata: product.metadata as StripMetadataType,
      }));
    } catch (e) {
      throw new ServerError(500, e);
    }
  }
);

export const useUpdateDbItem = routeAction$(
  async (data: JSONObject, requestEvent: RequestEventAction) => {
    try {
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
      throw new ServerError(500, error);
    }
  },
  validator$((requestEvent: RequestEvent, data: any) => {
    const session = requestEvent.sharedMap.get("session");

    if (!session || session.user?.email !== "ts22082@gmail.com") {
      throw new ServerError(401, "Unauthorized");
    }

    if (!data.name || !data.id) {
      throw new ServerError(400, "Missing name or id");
    }

    if (typeof data.name !== "string" || typeof data.id !== "string") {
      throw new ServerError(400, "Invalid name or id");
    }

    return {
      success: true,
      data,
    };
  })
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
    <div class="flex justify-center flex-wrap gap-2 mt-2">
      <Resource
        value={stripeProducts}
        onPending={() => <div>Loading...</div>}
        onRejected={(error) => <div>{error.message}</div>}
        onResolved={() =>
          localProducts.value.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleUiUpdate={handleUiUpdate}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
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
      content: "We sell skater owned skateboarding products",
    },
    {
      name: "image",
      content: "https://the-damaged-collective.vercel.app/og.png",
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
