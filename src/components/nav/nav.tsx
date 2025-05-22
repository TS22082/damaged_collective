import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import {
  navContainer,
  linkSection,
  navLink,
  titleLink,
  iconBtnBase,
} from "./nav.css";
import { BsHouse, BsPlus, BsCart, BsPerson } from "@qwikest/icons/bootstrap";
import type { NavItemType } from "~/shared/types";
import { useSession } from "~/routes/plugin@auth";
import { btnPressed, btnHover, btnPink } from "~/shared/styles.css";
import checkIsAdmin from "~/shared/utils/isAdmin";

export default component$(() => {
  const session = useSession();
  const location = useLocation();

  const navItems: NavItemType[] = [{ label: "Home", path: "/", icon: BsHouse }];

  checkIsAdmin(session)
    ? navItems.push({ label: "Admin", path: "/dashboard/", icon: BsPerson })
    : navItems.push({ label: "User", path: "/user/", icon: BsPerson });

  if (checkIsAdmin(session)) {
    navItems.push({ label: "New Board", path: "/new_board/", icon: BsPlus });
  }

  navItems.push({ label: "Cart", path: "/cart/", icon: BsCart });

  return (
    <nav class={navContainer}>
      <section class={linkSection}>
        {navItems.map((item) => {
          const styleArr = [iconBtnBase, btnPink];
          location.url.pathname !== item.path
            ? styleArr.push(btnHover)
            : styleArr.push(btnPressed);

          return (
            <Link key={item.label} class={navLink} href={item.path}>
              <button class={styleArr}>
                <item.icon
                  style={{
                    height: "20px",
                    width: "20px",
                  }}
                />
              </button>
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
