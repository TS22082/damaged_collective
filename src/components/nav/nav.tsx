import { component$, useSignal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import {
  navContainer,
  linkSection,
  navLink,
  titleLink,
  iconBtnBase,
  bPink,
  iconHover,
} from "./nav.css";
import { BsHouse, BsPlus, BsCart, BsPerson } from "@qwikest/icons/bootstrap";
import type { NavItemType } from "~/types";
import { useSession } from "~/routes/plugin@auth";
import { useTask$ } from "@builder.io/qwik";

export default component$(() => {
  const session = useSession();
  const userSession = useSignal(session.value);

  const navItems: NavItemType[] = [
    { label: "Home", path: "/", icon: BsHouse },
    { label: "User", path: "/user", icon: BsPerson },
  ];

  useTask$(({ track }) => {
    const session = track(() => userSession.value);
    if (session) userSession.value = session;
  });

  if (userSession.value?.user?.email === "ts22082@gmail.com") {
    navItems.push({ label: "New Board", path: "/new_board", icon: BsPlus });
  }

  navItems.push({ label: "Cart", path: "/cart", icon: BsCart });

  return (
    <nav class={navContainer}>
      <section class={linkSection}>
        {navItems.map((item) => (
          <Link key={item.label} class={navLink} href={item.path}>
            <button class={[iconBtnBase, iconHover, bPink]}>
              <item.icon
                style={{
                  height: "20px",
                  width: "20px",
                }}
              />
            </button>
          </Link>
        ))}
      </section>
      <Link href="/" class={titleLink}>
        The Damaged Collective
      </Link>
    </nav>
  );
});
