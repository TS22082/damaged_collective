import { server$ } from "@builder.io/qwik-city";
import { ServerError } from "@builder.io/qwik-city/middleware/request-handler";
import { ObjectId } from "mongodb";
import { getDb } from "~/shared/mongodb";
import type { OrderStatusType } from "~/shared/types";

export const updateOrderStatus = server$(async function (
  orderId: string,
  status: OrderStatusType
) {
  const uri = this.env.get("MONGO_URI") || "";

  try {
    const db = await getDb(uri);

    const filter = {
      _id: new ObjectId(orderId),
    };

    const update = {
      $set: {
        status: status,
      },
    };

    const updateResponse = await db
      .collection("orders")
      .updateOne(filter, update);

    return updateResponse;
  } catch (error) {
    return new ServerError(500, error);
  }
});
