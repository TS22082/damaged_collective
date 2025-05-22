import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <h1>Dashboard</h1>
      <div>This is the dashboard</div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Admin Dashboard",
  meta: [
    {
      name: "Dashboard",
      content: "This is the dashboard",
    },
  ],
};
