import { component$, useSignal } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getDb } from "~/db/mongodb";
import ProductCard from "~/components/ProductCard";
import { $ } from "@builder.io/qwik";
import type { BoardType } from "~/types";
import { updateProduct } from "~/server/updateProduct";
import { deleteProduct } from "~/server/deleteProduct";

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

export default component$(() => {
  const products = useProducts();
  const localProducts = useSignal<BoardType[]>(products.value);

  const handleSave = $(async (product: BoardType) => {
    await updateProduct(product);

    localProducts.value = products.value.map((p) => {
      if (p._id === product._id) {
        p.brand = product.brand;
        p.img = product.img;
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
            handleSave={handleSave}
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
