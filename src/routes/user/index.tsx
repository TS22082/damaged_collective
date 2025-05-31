import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { component$, useContext } from "@builder.io/qwik";
import { useSignOut } from "../plugin@auth";
import { UserContext } from "~/contexts";

export default component$(() => {
  const signOut = useSignOut();
  const user = useContext(UserContext);

  return (
    <>
      <h1>The User page</h1>
      <div>This is the demo user page</div>
      {user.value?.email ? (
        <p>{user.value.email}</p>
      ) : (
        <p>
          Not signed in, <Link href="/login">Sign In</Link>
        </p>
      )}

      {user.value?.email && (
        <button
          onClick$={() =>
            signOut.submit({
              redirectTo: "/",
            })
          }
        >
          Sign Out
        </button>
      )}
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
