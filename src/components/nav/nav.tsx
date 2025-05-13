import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  const styles = {
    nav: "h-30v flex flex-column justify-center items-center bg-dark",
    linkSection: "flex",
    link: "style-none text-light",
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "User", path: "/user" },
    { label: "Cart", path: "/cart" },
  ];

  return (
    <nav class={styles.nav}>
      <h1 class="text-title text-light">The Damaged Collective</h1>
      <section class={styles.linkSection}>
        {navItems.map((item) => (
          <Link key={item.label} class={styles.link} href={item.path}>
            {item.label}
          </Link>
        ))}
      </section>
    </nav>
  );
});
