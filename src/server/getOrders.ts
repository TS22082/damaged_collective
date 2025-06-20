import { server$ } from "@builder.io/qwik-city";
import { getDb } from "~/shared/mongodb";

export const getOrders = server$(async function () {
  const uri = this.env.get("MONGO_URI") || "";

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