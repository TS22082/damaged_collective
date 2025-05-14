import type { DocumentHead } from "@builder.io/qwik-city";
import { component$ } from "@builder.io/qwik";
import { useSession } from "../plugin@auth";

export default component$(() => {
  const session = useSession();

  console.log(session.value);
  return (
    <>
      <h1>The User page</h1>
      <div>This is the demo user page</div>
    </>
  );
});

export const head: DocumentHead = {
  title: "User",
  meta: [
    {
      name: "User page",
      content: "User page where you can view past orders",
    },
  ],
};
