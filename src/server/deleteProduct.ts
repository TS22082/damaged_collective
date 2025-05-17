import { server$ } from "@builder.io/qwik-city";
import { getDb } from "~/db/mongodb";
import Types from "mongodb";

export const deleteProduct = server$(async function (id: string )  {
  try {
    const uri = this.env.get("MONGO_URI") || "";
    const db = await getDb(uri);
    const filter = { _id: new Types.ObjectId(id) };
    const result = await db.collection("products").deleteOne(filter);
    return result;
  } catch (e) {
    console.error(e);
  }
});