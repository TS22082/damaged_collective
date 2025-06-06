import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getDb } from "~/shared/mongodb";

export const useOrdersLoader = routeLoader$(async (requestEvent) => {
  const uri = requestEvent.env.get("MONGO_URI") || "";

  try {
    const db = await getDb(uri);
    const ordersRobust = await db.collection("orders").find({}).toArray();

    const orders = ordersRobust.map((order) => {
      return {
        _id: order._id.toString(),
        eventId: order.eventId,
        sessionId: order.sessionId,
        name: order.shipping.name,
        status: order.status,
        address: order.shipping.address,
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
    <>
      <h1>Orders</h1>
      {ordersArr.value.map((order: any, index: number) => (
        <div key={index}>
          <p>{order.name}</p>
          {/* <p>{order.address}</p> */}
          <p>{order.status}</p>
        </div>
      ))}
    </>
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
