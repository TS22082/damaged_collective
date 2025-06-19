import { component$, useContext, useSignal, useTask$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import {
  navContainer,
  linkSection,
  navLink,
  titleLink,
  cartItemIndicator,
} from "./nav.css";
import type { NavItemType } from "~/shared/types";
import { CartContext, UserContext } from "~/contexts";
import {
  ICON_MAP,
  ICON_SIZE,
  navItems,
  navItemsAdmin,
} from "~/shared/constants";
import { getIconSyles } from "~/shared/utils/getLocationStyles";

export default component$(() => {
  const location = useLocation();
  const cart = useContext(CartContext);
  const user = useContext(UserContext);
  const navItemsSignal = useSignal<NavItemType[]>([]);

  useTask$(({ track }) => {
    const userTracking = track(() => user);

    if (userTracking.value?.email === "ts22082@gmail.com") {
      navItemsSignal.value = navItemsAdmin;
    } else {
      navItemsSignal.value = navItems;
    }
  });

  return (
    <nav class={navContainer}>
      <section class={linkSection}>
        {navItemsSignal.value.map((item) => {
          const [stylesArr, itemsInCart, onCartPage] = getIconSyles(
            item,
            location,
            cart
          );

          const Icon = ICON_MAP[item.label as keyof typeof ICON_MAP];

          return (
            <Link key={item.label} class={navLink} href={item.path}>
              <button class={stylesArr as string[]}>
                <Icon style={ICON_SIZE} />
              </button>
              {itemsInCart && onCartPage && (
                <div class={cartItemIndicator}>{cart.value.items.length}</div>
              )}
            </Link>
          );
        })}
      </section>
      <Link href="/" class={titleLink}>
        The Damaged Collective
      </Link>
    </nav>
  );
});
