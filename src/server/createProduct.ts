import { server$ } from "@builder.io/qwik-city";
import { getDb } from "~/db/mongodb";

export const createProduct = server$(async (product) => {
  try {
    const db = await getDb();
    await db.collection("products").insertOne({...product, type: "board"});
    return product;
  } catch (e) {
    console.error(e);
  }
});