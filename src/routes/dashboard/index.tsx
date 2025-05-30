import { component$ } from "@builder.io/qwik";
import { useSignOut } from "../plugin@auth";

export default component$(() => {
  const signOut = useSignOut();

  return (
    <>
      <h1>Dashboard</h1>
      <div>This is the dashboard</div>
      <button
        onClick$={() => {
          signOut.submit({
            redirectTo: "/",
          });
        }}
      >
        Sign Out
      </button>
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
