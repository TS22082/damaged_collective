import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$, server$ } from "@builder.io/qwik-city";
import { getDb } from "~/db/mongodb";
import ProductCard from "~/components/ProductCard";
import Types from "mongodb";
import { $ } from "@builder.io/qwik";
import { Board } from "~/types";

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

export const saveProduct = server$(async (product: Board) => {
  try {
    const db = await getDb();
    const filter = { _id: new Types.ObjectId(product._id as string) };
    const update = { $set: { brand: product.brand, img: product.img } };
    const result = await db.collection("products").updateOne(filter, update);

    return result;
  } catch (e) {
    console.error(e);
  }
});

export default component$(() => {
  const products = useProducts();
  const localProducts = useSignal<Board[]>(products.value);

  const handleSave = $(async (product: Board) => {
    await saveProduct(product);

    localProducts.value = products.value.map((p) => {
      if (p._id === product._id) {
        p.brand = product.brand;
        p.img = product.img;
      }
      return p;
    });
  });

  return (
    <>
      <div class="flex justify-center flex-wrap gap-2 mt-2">
        {localProducts.value.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            handleSave={handleSave}
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
