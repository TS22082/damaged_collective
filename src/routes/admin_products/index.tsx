import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <h1>Products</h1>
      <p>This is the admin products page</p>
    </>
  );
});

export const head: DocumentHead = {
  title: "Orders",
  meta: [
    {
      name: "description",
      content: "Orders",
    },
  ],
};
