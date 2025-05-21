import { Form, type DocumentHead } from "@builder.io/qwik-city";
import { component$ } from "@builder.io/qwik";
import { useSession, useSignOut } from "../plugin@auth";

export default component$(() => {
  const session = useSession();
  const signOut = useSignOut();

  return (
    <>
      <h1>The User page</h1>
      <div>This is the demo user page</div>
      {session.value?.user?.email}
      <Form action={signOut}>
        <input type="hidden" name="redirectTo" value="/" />
        <button>Sign Out</button>
      </Form>
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
