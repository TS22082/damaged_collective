import { component$, useContext, useSignal, useTask$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import {
  navContainer,
  linkSection,
  navLink,
  titleLink,
  iconBtnBase,
  cartHasItems,
  cartItemIndicator,
} from "./nav.css";
import type { NavItemType } from "~/shared/types";
// import { useSession } from "~/routes/plugin@auth";
import { btnPressed, btnHover, btnPink } from "~/shared/styles.css";
// import checkIsAdmin from "~/shared/utils/isAdmin";
import { CartContext, UserContext } from "~/contexts";
import { iconMap, navItems, navItemsAdmin } from "~/shared/constants";

export default component$(() => {
  // const session = useSession();
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
          const styleArr = [iconBtnBase, btnPink];
          location.url.pathname !== item.path
            ? styleArr.push(btnHover)
            : styleArr.push(btnPressed);

          if (cart.value.items.length > 0 && item.label === "Cart") {
            styleArr.push(cartHasItems);
          }

          const Icon = iconMap[item.label as keyof typeof iconMap];

          return (
            <Link key={item.label} class={navLink} href={item.path}>
              <button class={styleArr}>
                <Icon
                  style={{
                    height: "20px",
                    width: "20px",
                  }}
                />
              </button>
              {cart.value.items.length > 0 && item.label === "Cart" && (
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
