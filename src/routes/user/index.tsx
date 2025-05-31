import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { component$ } from "@builder.io/qwik";
import { useSession, useSignOut } from "../plugin@auth";

export default component$(() => {
  const session = useSession();
  const signOut = useSignOut();

  return (
    <>
      <h1>The User page</h1>
      <div>This is the demo user page</div>
      {session.value?.user?.email ? (
        <p>{session.value.user.email}</p>
      ) : (
        <p>
          Not signed in, <Link href="/login">Sign In</Link>
        </p>
      )}

      {session.value?.user?.email && (
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
