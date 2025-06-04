import {
  component$,
  Slot,
  useContextProvider,
  useSignal,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import Nav from "~/components/nav/nav";
import Footer from "~/components/footer/footer";
import { CartContext, UserContext } from "~/contexts";
import type { CartItem, CartState, UserType } from "~/shared/types";
import { useSession } from "./plugin@auth";

const setCart = (cart: { value: CartState }, localStoredCart: CartItem[]) => {
  cart.value = { items: localStoredCart };
};

const setUser = (
  user: { value: null | UserType },
  localStoredUser: null | UserType
) => {
  user.value = localStoredUser;
};

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

  const user = useSignal<null | UserType>(null);
  const session = useSession();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) return setCart(cart, JSON.parse(storedCart));
    localStorage.setItem("cart", JSON.stringify(cart.value.items));
  });

  useTask$(({ track }) => {
    const sessionTracking = track(() => session);
    const emailFromSession = sessionTracking.value?.user?.email;

    if (emailFromSession) {
      setUser(user, sessionTracking.value?.user as UserType);
    } else {
      user.value = null;
    }
  });

  useContextProvider(UserContext, user);
  useContextProvider(CartContext, cart);

  return (
    <>
      <Nav />
      <Slot />
      <Footer />
    </>
  );
});
