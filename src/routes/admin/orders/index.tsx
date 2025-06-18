import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { orderContainer, ordersContainer } from "./admin.css";
import { getOrders } from "~/server/getOrders";

export default component$(() => {
  const ordersArr = useResource$<any[]>(async () => {
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
        value={ordersArr}
        onPending={() => <div>Loading...</div>}
        onRejected={(error) => <div>{error.message}</div>}
        onResolved={(ordersArr) =>
          ordersArr.map((order: any, index: number) => (
            <button key={index} class={orderContainer}>
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
