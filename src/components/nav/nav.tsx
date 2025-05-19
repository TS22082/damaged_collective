import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { navContainer, linkSection, navLink, titleLink } from "./nav.css";

export default component$(() => {
  const navItems = [
    { label: "Home", path: "/" },
    { label: "New Board", path: "/new_board" },
    { label: "User", path: "/user" },
    { label: "Cart", path: "/cart" },
  ];

  return (
    <nav class={navContainer}>
      <Link href="/" class={titleLink}>
        The Damaged Collective
      </Link>
      <section class={linkSection}>
        {navItems.map((item) => (
          <Link key={item.label} class={navLink} href={item.path}>
            {item.label}
          </Link>
        ))}
      </section>
    </nav>
  );
});
