import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <h1>Product Page</h1>
      <div>This will be the single product page</div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Product Page",
  meta: [
    {
      name: "Specific Product",
      content: "Product Page",
    },
  ],
};
