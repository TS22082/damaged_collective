import { DocumentHead } from "@builder.io/qwik-city";
import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <>
      <h1>The User page</h1>
      <div>This is the demo user page</div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Home",
  meta: [
    {
      name: "User page",
      content: "User page where you can view past orders",
    },
  ],
};
