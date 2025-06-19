import { type RouteLocation } from "@builder.io/qwik-city";
import type { CartState, NavItemType } from "../types";
import { cartHasItems, iconBtnBase } from "~/components/nav/nav.css";
import { btnHover, btnPink, btnPressed } from "../styles.css";
import { type Signal } from "@builder.io/qwik";
import { ICON_MAP } from "../constants";

type IconStyles = {
  item: NavItemType;
  location: RouteLocation;
  cart: Signal<CartState>;
};

export const getIconSyles = ({ item, location, cart }: IconStyles) => {
  const styleArr = [iconBtnBase, btnPink];

  location.url.pathname !== item.path
    ? styleArr.push(btnHover)
    : styleArr.push(btnPressed);

  const itemsInCart = cart.value.items.length > 0;
  const onCartPage = location.url.pathname === "/cart/";
  const showIndicator = itemsInCart && !onCartPage;

  if (showIndicator) styleArr.push(cartHasItems);

  const Icon = ICON_MAP[item.label as keyof typeof ICON_MAP];
  const cartCount = cart.value.items.length || 0;

  return { styleArr, showIndicator, Icon, cartCount };
};
