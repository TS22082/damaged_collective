import { BsCart, BsHouse, BsPerson, BsPlus } from "@qwikest/icons/bootstrap";
import { type NavItemType } from "./types";
import { type IconProps } from "@qwikest/icons";
import { type JSXNode } from "@builder.io/qwik/jsx-runtime";

export const navItems: NavItemType[] = [
  { label: "Home", path: "/" },
  { label: "User", path: "/user/" },
  { label: "Cart", path: "/cart/" },
];

export const navItemsAdmin: NavItemType[] = [
  { label: "Home", path: "/" },
  { label: "New Board", path: "/admin/new/" },
  { label: "Admin", path: "/admin/dashboard/" },
  { label: "Cart", path: "/cart/" },
];

export const ADMIN_DASHBOARD_ITEMS = [
  { label: "New Product", path: "/admin/new/" },
  { label: "Orders", path: "/admin/orders/" },
  { label: "Products", path: "/admin/products/" },
];

export const ICON_MAP = {
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

export const RESOURCE_TIMEOUT = { timeout: 3000 };

export const DELETE_CONFIRMATION_MESSAGE =
  "Are you sure you want to delete this product? This cannot be undone.";

export const ICON_SIZE = {
  height: "20px",
  width: "20px",
};
