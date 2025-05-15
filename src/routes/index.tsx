import { component$, useSignal } from "@builder.io/qwik";
import {
  type JSONObject,
  type DocumentHead,
  routeAction$,
  routeLoader$,
} from "@builder.io/qwik-city";
import { getDb } from "~/db/mongodb";
import ProductCard from "~/components/ProductCard";
import { $ } from "@builder.io/qwik";
import type { BoardType } from "~/types";
import { deleteProduct } from "~/server/deleteProduct";
import Types from "mongodb";

export const useProducts = routeLoader$(async () => {
  try {
    const db = await getDb();
    const mongoProducts = await db.collection("products").find().toArray();

    return mongoProducts.map((product) => ({
      brand: product.brand,
      img: product.img,
      _id: product._id.toString(),
    }));
  } catch (e) {
    console.error(e);
  }

  return [];
});

export const useUpdateDbItem = routeAction$(async (data: JSONObject) => {
  try {
    const db = await getDb();
    const filter = { _id: new Types.ObjectId(data._id as string) };
    const update = { $set: { brand: data.brand } };
    await db.collection("products").updateOne(filter, update);
    return { success: true };
  } catch (error) {
    console.error(error);
  }
});

export default component$(() => {
  const products = useProducts();
  const localProducts = useSignal<BoardType[]>(products.value);
  const handleUpdate = useUpdateDbItem();

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
    await deleteProduct(id);
    localProducts.value = products.value.filter((p) => p._id !== id);
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
      name: "description",
      content: "Qwik site description",
    },
  ],
};
