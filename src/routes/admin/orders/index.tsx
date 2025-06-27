import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { ordersContainer } from "./admin.css";
import { getOrders } from "~/services/getOrders";
import { type OrderSummaryType } from "~/shared/types";
import OrdersTable from "../../../components/orders-table";

export default component$(() => {
  const orders = useResource$<OrderSummaryType[]>(async () => {
    try {
      const orders = await getOrders();
      return orders;
    } catch (error) {
      return [];
    }
  });

  return (
    <div class={ordersContainer}>
      <Resource
        value={orders}
        onPending={() => <div>Loading...</div>}
        onResolved={(orders) => <OrdersTable orders={orders} />}
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Orders",
  meta: [
    {
      name: "description",
      content: "Orders",
    },
  ],
};
