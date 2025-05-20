import { server$ } from "@builder.io/qwik-city";
import { getDb } from "~/db/mongodb";
import Types from "mongodb";
import { Session } from "@auth/qwik";

// TODO: Need this to delete items from stripe
// TODO: Need to move this file to "routes/api"
export const deleteProduct = server$(async function (id: string )  {
  try {
    const uri = this.env.get("MONGO_URI") || "";
    const session: Session | null = this.sharedMap.get("session");

    if (!session || session.user?.email !== "ts22082@gmail.com") {
      return { success: false };
    }

    const db = await getDb(uri);
    const filter = { _id: new Types.ObjectId(id) };
    const result = await db.collection("products").deleteOne(filter);
    return result;
  } catch (e) {
    console.error(e);
  }
});