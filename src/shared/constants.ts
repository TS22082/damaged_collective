import { BsCart, BsHouse, BsPerson, BsPlus } from "@qwikest/icons/bootstrap";
import { type NavItemType } from "./types";
import { type IconProps } from "@qwikest/icons";
import { type JSXNode } from "@builder.io/qwik/jsx-runtime";

export const navItems: NavItemType[] = [
  { label: "Home", path: "/" },
  { label: "User", path: "/user/" },
  { label: "Cart", path: "/cart/", items: false },
];

export const navItemsAdmin: NavItemType[] = [
  { label: "Home", path: "/" },
  { label: "New Board", path: "/admin_new/" },
  { label: "Admin", path: "/dashboard/" },
  { label: "Cart", path: "/cart/", items: false },
];

export const iconMap = {
  Home: BsHouse as (props: IconProps) => JSXNode,
  User: BsPerson as (props: IconProps) => JSXNode,
  Admin: BsPerson as (props: IconProps) => JSXNode,
  Cart: BsCart as (props: IconProps) => JSXNode,
  "New Board": BsPlus as (props: IconProps) => JSXNode,
};

export const DEFAULT_STRIPE_FILTER = {
  limit: 100,
  active: true,
};
