import { type Session } from "@auth/qwik";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import {
  type JSONObject,
  type RequestEventAction,
  Form,
  routeAction$,
  useNavigate,
} from "@builder.io/qwik-city";
import { getDb } from "~/db/mongodb";

export const useCreateProduct = routeAction$(
  async (data: JSONObject, requestEvent: RequestEventAction) => {
    try {
      const session: Session | null = requestEvent.sharedMap.get("session");

      if (!session || session.user?.email !== "ts22082@gmail.com") {
        return { success: false };
      }

      const uri = requestEvent.env.get("MONGO_URI") || "";
      const db = await getDb(uri);
      await db.collection("products").insertOne({ ...data, type: "board" });

      return {
        success: true,
      };
    } catch (e) {
      console.error(e);
    }
  }
);

export default component$(() => {
  const nav = useNavigate();
  const createProduct = useCreateProduct();

  useTask$(({ track }) => {
    const created = track(() => createProduct.value);
    if (created?.success === true) nav("/");
  });

  const form = useSignal({ img: "", brand: "" });

  return (
    <>
      <h1>New Board Page</h1>
      <div>This is the new board page</div>
      <Form action={createProduct}>
        <label>Image</label>
        <input
          type="text"
          name="img"
          value={form.value.img}
          onInput$={(e) =>
            (form.value.img = (e.target as HTMLInputElement).value)
          }
        />
        <label>Brand</label>
        <input
          type="text"
          name="brand"
          value={form.value.brand}
          onInput$={(e) =>
            (form.value.brand = (e.target as HTMLInputElement).value)
          }
        />
        <button type="submit">Submit</button>
      </Form>
    </>
  );
});
