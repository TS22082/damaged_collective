import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { orderContainer, ordersContainer } from "./admin.css";
import { getOrders } from "~/server/getOrders";
import { type OrderSummaryType } from "~/shared/types";

export default component$(() => {
  const nav = useNavigate();
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
        onRejected={(error) => <div>{error.message}</div>}
        onResolved={(ordersArr) =>
          ordersArr.map((order: any, index: number) => (
            <button
              key={index}
              class={orderContainer}
              onClick$={() => nav(`/admin/order/${order._id}`)}
            >
              <p>{order.name}</p>
              <p>
                {order.address.city}, {order.address.state}
              </p>
              <p>{order.itemsCount}</p>
              <p>${order.total}</p>
              <p>{order.status}</p>
            </button>
          ))
        }
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
