import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Form } from "@builder.io/qwik-city";
import { useSignIn } from "~/routes/plugin@auth";

export default component$(() => {
  const signIn = useSignIn();
  return (
    <>
      <Form action={signIn}>
        <input type="hidden" name="providerId" value="github" />
        <input type="hidden" name="options.redirectTo" value="/" />
        <button>Sign In</button>
      </Form>
    </>
  );
});

export const head: DocumentHead = {
  title: "Login Page",
  meta: [
    {
      name: "Login to your account",
      content: "Login Page",
    },
  ],
};
