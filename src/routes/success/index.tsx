import {
  component$,
  isBrowser,
  useContext,
  useVisibleTask$,
} from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { CartContext } from "~/contexts";

export default component$(() => {
  const cart = useContext(CartContext);
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (isBrowser) {
      localStorage.setItem("cart", JSON.stringify([]));
      cart.value = { items: [] };
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
