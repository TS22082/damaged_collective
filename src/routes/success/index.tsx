import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <h1>Success</h1>
      <p>This is the success page</p>
      <p>
        You can go back to the <Link href="/">home page</Link>
      </p>
    </>
  );
});
