import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <h1>Orders</h1>
      <p>This is the orders page</p>
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
