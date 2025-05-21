import {
  component$,
  Slot,
  useContextProvider,
  useSignal,
  useOn,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import Nav from "~/components/nav/nav";
import Footer from "~/components/footer/footer";
import { CartContext } from "~/contexts";
import type { CartItem, CartState } from "~/types";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export default component$(() => {
  const cart = useSignal<CartState>({
    items: [] as CartItem[],
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) cart.value.items = JSON.parse(storedCart);
    else localStorage.setItem("cart", JSON.stringify(cart.value.items));
  });

  useContextProvider(CartContext, cart);

  return (
    <>
      <Nav />
      <Slot />
      <Footer />
    </>
  );
});
