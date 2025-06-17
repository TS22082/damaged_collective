import { $, component$ } from "@builder.io/qwik";
import { useSignOut } from "../../plugin@auth";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import {
  dashBoardContainer,
  dashboardHeader,
  dashboardItemTile,
} from "./dashboard.css";
import { btn, btnHover, btnPink, shaddowed } from "~/shared/styles.css";
import { ADMIN_DASHBOARD_ITEMS } from "~/shared/constants";

export default component$(() => {
  const signOut = useSignOut();
  const nav = useNavigate();

  const handleSignOut = $(() => {
    signOut.submit({
      redirectTo: "/",
    });
  });

  return (
    <>
      <div class={dashboardHeader}>
        <h1>Dashboard</h1>

        <button
          class={[btn, btnPink, btnHover, shaddowed]}
          onClick$={() => handleSignOut()}
        >
          Sign Out
        </button>
      </div>

      <div class={dashBoardContainer}>
        {ADMIN_DASHBOARD_ITEMS.map((item) => (
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
