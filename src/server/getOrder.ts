import { server$ } from "@builder.io/qwik-city";
import { ObjectId } from "mongodb";
import { getDb } from "~/shared/mongodb";

export const getOrder = server$(async function (id: string) {
  try {
    const uri = this.env.get("MONGO_URI") || "";
    const db = await getDb(uri);
    const order = await db.collection("orders").findOne({ _id: new ObjectId(id) });
    
    return {...order, _id: order?._id.toString()};
  } catch (error) {
    return null;
  }
})