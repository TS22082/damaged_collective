import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { useSession, useSignOut } from "../plugin@auth";

export default component$(() => {
  const session = useSession();
  const signOut = useSignOut();
  const userSession = useSignal(session.value);

  useTask$(({ track }) => {
    const session = track(() => userSession.value);
    if (session) userSession.value = session;
  });

  return (
    <>
      <h1>The User page</h1>
      <div>This is the demo user page</div>
      {userSession.value?.user?.email ? (
        <p>{userSession.value.user.email}</p>
      ) : (
        <p>
          Not signed in, <Link href="/login">Sign In</Link>
        </p>
      )}

      {userSession.value?.user?.email && (
        <button onClick$={() => signOut.submit({})}>Sign Out</button>
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
