import { component$, isBrowser, useVisibleTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (isBrowser) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  });

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
