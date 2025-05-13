import { server$ } from "@builder.io/qwik-city";
import { getDb } from "~/db/mongodb";
import Types from "mongodb";

export const deleteProduct = server$(async (id: string) => {
  try {
    const db = await getDb();
    const filter = { _id: new Types.ObjectId(id) };
    const result = await db.collection("products").deleteOne(filter);
    return result;
  } catch (e) {
    console.error(e);
  }
});