import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { getDb } from "~/db/mongodb";
import ProductCard from "~/components/ProductCard";

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

  console.log(products.value);

  return (
    <>
      <h1>Hi 👋</h1>
      <div>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </div>
      <div class="flex justify-center flex-wrap gap-2">
        {products.value.map((product) => (
          <ProductCard key={product._id} product={product} />
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
