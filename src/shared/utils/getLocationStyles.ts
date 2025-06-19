import { type RouteLocation } from "@builder.io/qwik-city";
import type { CartState, NavItemType } from "../types";
import { cartHasItems, iconBtnBase } from "~/components/nav/nav.css";
import { btnHover, btnPink, btnPressed } from "../styles.css";
import { type Signal } from "@builder.io/qwik";

export const getIconSyles = (
  item: NavItemType,
  location: RouteLocation,
  cart: Signal<CartState>
) => {
  const styleArr = [iconBtnBase, btnPink];

  location.url.pathname !== item.path
    ? styleArr.push(btnHover)
    : styleArr.push(btnPressed);

  const itemsInCart = cart.value.items.length > 0;
  const onCartPage = location.url.pathname === "/cart/";

  if (itemsInCart && onCartPage) styleArr.push(cartHasItems);

  return styleArr;
};
