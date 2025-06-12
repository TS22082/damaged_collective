import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getDb } from "~/shared/mongodb";
import { orderContainer, ordersContainer } from "./admin.css";

export const useOrdersLoader = routeLoader$(async (requestEvent) => {
  const uri = requestEvent.env.get("MONGO_URI") || "";

  try {
    const db = await getDb(uri);
    const ordersRobust = await db.collection("orders").find({}).toArray();

    const orders = ordersRobust.map((order) => {
      const total = order.items.reduce((acc: number, item: any) => {
        return acc + item.quantity * item.price.unit_amount;
      }, 0);

      return {
        _id: order._id.toString(),
        eventId: order.eventId,
        sessionId: order.sessionId,
        name: order.shipping.name,
        status: order.status,
        address: order.shipping.address,
        itemsCount: order.items.length,
        total: (total / 100).toFixed(2),
      };
    });

    return orders;
  } catch (error) {
    return [];
  }
});

export default component$(() => {
  const ordersArr = useOrdersLoader();

  return (
    <div class={ordersContainer}>
      {ordersArr.value.map((order: any, index: number) => (
        <button key={index} class={orderContainer}>
          <p>{order.name}</p>
          <p>
            {order.address.city}, {order.address.state}
          </p>
          <p>{order.itemsCount}</p>
          <p>${order.total}</p>
          <p>{order.status}</p>
        </button>
      ))}
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
