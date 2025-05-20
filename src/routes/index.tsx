import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import {
  type JSONObject,
  type DocumentHead,
  type RequestEventLoader,
  type RequestEventAction,
  routeAction$,
  routeLoader$,
} from "@builder.io/qwik-city";
import { getDb } from "~/db/mongodb";
import ProductCard from "~/components/product-card";
import { $ } from "@builder.io/qwik";
import type { BoardType } from "~/types";
import { deleteProduct } from "~/server/deleteProduct";
import Types from "mongodb";
import { type Session } from "@auth/qwik";
import Stripe from "stripe";
import { ServerError } from "@builder.io/qwik-city/middleware/request-handler";

export const useProducts = routeLoader$(
  async (requestEvent: RequestEventLoader) => {
    try {
      const uri = requestEvent.env.get("MONGO_URI") || "";
      const db = await getDb(uri);
      const mongoProducts = await db.collection("products").find().toArray();

      return mongoProducts.map((product) => ({
        brand: product.brand,
        img: product.img,
        _id: product._id.toString(),
      }));
    } catch (e) {
      throw new ServerError(500, e);
    }

    return [];
  }
);

export const useStripeProducts = routeLoader$(
  async (requestEvent: RequestEventLoader) => {
    const stripe = new Stripe(requestEvent.env.get("SECRET_STRIPE_KEY") || "", {
      apiVersion: "2025-04-30.basil",
    });

    try {
      const products = await stripe.products.list();
      return products.data;
    } catch (e) {
      throw new ServerError(500, e);
    }

    return [];
  }
);

// TODO: This needs a validator
// TODO: THis neds to update an item in stripe
export const useUpdateDbItem = routeAction$(
  async (data: JSONObject, requestEvent: RequestEventAction) => {
    try {
      const uri = requestEvent.env.get("MONGO_URI") || "";
      const session: Session | null = requestEvent.sharedMap.get("session");

      if (!session || session.user?.email !== "ts22082@gmail.com") {
        return { success: false };
      }

      const db = await getDb(uri);
      const filter = { _id: new Types.ObjectId(data._id as string) };
      const update = { $set: { brand: data.brand } };
      await db.collection("products").updateOne(filter, update);
      return { success: true };
    } catch (error) {
      throw new ServerError(500, error);
    }
  }
);

export default component$(() => {
  const products = useProducts();
  const stripeProducts = useStripeProducts();
  const localProducts = useSignal<BoardType[]>(products.value);
  const handleUpdate = useUpdateDbItem();

  useTask$(() => {
    // TODO: Need to change out "products" with stripeProducts across the app
    console.log("Stripe products ==>", stripeProducts.value);
  });

  const handleUiUpdate = $((product: BoardType) => {
    localProducts.value = products.value.map((p) => {
      if (p._id === product._id) {
        return {
          ...p,
          brand: product.brand,
        };
      }
      return p;
    });
  });

  const handleDelete = $(async (id: string) => {
    try {
      await deleteProduct(id);
      localProducts.value = products.value.filter((p) => p._id !== id);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <div class="flex justify-center flex-wrap gap-2 mt-2">
        {localProducts.value.map((product) => (
          <ProductCard
            key={product._id}
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
