import { type NavItemType } from "./types";

export const navItems: NavItemType[] = [
  { label: "Home", path: "/" },
  { label: "User", path: "/user/" },
  { label: "Cart", path: "/cart/", items: false },
];

export const navItemsAdmin: NavItemType[] = [
  { label: "Home", path: "/" },
  { label: "New Board", path: "/new_board/" },
  { label: "Admin", path: "/dashboard/" },
  { label: "Cart", path: "/cart/", items: false },
];
