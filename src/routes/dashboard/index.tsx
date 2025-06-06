import { $, component$ } from "@builder.io/qwik";
import { useSignOut } from "../plugin@auth";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import {
  dashBoardContainer,
  dashboardHeader,
  dashboardItemTile,
} from "./dashboard.css";
import { btn, btnOrange, shaddowed } from "~/shared/styles.css";
import { BsArrowRight } from "@qwikest/icons/bootstrap";
import { iconBtnBase } from "~/components/nav/nav.css";

export default component$(() => {
  const signOut = useSignOut();
  const nav = useNavigate();

  const handleSignOut = $(() => {
    signOut.submit({
      redirectTo: "/",
    });
  });

  const dashboardItems = [
    { label: "New Product", path: "/new_board/" },
    { label: "Orders", path: "/orders/" },
    { label: "Products", path: "/" },
  ];

  return (
    <>
      <div class={dashboardHeader}>
        <h1>Dashboard</h1>

        <button
          class={[btn, btnOrange, iconBtnBase]}
          onClick$={() => handleSignOut()}
        >
          <BsArrowRight style={{ fontSize: "1.5rem", fontWeight: "bold" }} />
        </button>
      </div>

      <div class={dashBoardContainer}>
        {dashboardItems.map((item) => (
          <div
            class={[dashboardItemTile, shaddowed]}
            key={item.label}
            onClick$={() => nav(item.path)}
          >
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Admin Dashboard",
  meta: [
    {
      name: "Dashboard",
      content: "This is the dashboard",
    },
  ],
};
