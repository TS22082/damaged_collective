import { server$ } from "@builder.io/qwik-city";
import { getDb } from "~/db/mongodb";
import type { BoardType } from "~/types";
import Types from "mongodb";

export const saveProduct = server$(async (product: BoardType) => {
  try {
    const db = await getDb();
    const filter = { _id: new Types.ObjectId(product._id as string) };
    const update = { $set: { brand: product.brand, img: product.img } };
    const result = await db.collection("products").updateOne(filter, update);

    return result;
  } catch (e) {
    console.error(e);
  }
});