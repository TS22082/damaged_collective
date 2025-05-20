import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { RequestEvent } from "@builder.io/qwik-city";
import {
  type JSONObject,
  type RequestEventAction,
  Form,
  routeAction$,
  useNavigate,
  validator$,
} from "@builder.io/qwik-city";
import { ServerError } from "@builder.io/qwik-city/middleware/request-handler";
import Stripe from "stripe";

export const useCreateProduct = routeAction$(
  async (data: JSONObject, requestEvent: RequestEventAction) => {
    try {
      const stripe = new Stripe(
        requestEvent.env.get("SECRET_STRIPE_KEY") || "",
        {
          apiVersion: "2025-04-30.basil",
        }
      );

      await stripe.products.create({
        name: data.name as string,
        images: [data.img as string],
        metadata: {
          brand: data.brand as string,
          primaryImg: data.img as string,
        },
      });

      return {
        success: true,
      };
    } catch (e) {
      throw new ServerError(500, e);
    }
  },
  validator$((requestEvent: RequestEvent, data: any) => {
    const session = requestEvent.sharedMap.get("session");
    if (!session || session.user?.email !== "ts22082@gmail.com") {
      throw new ServerError(401, "Unauthorized");
    }

    if (!data?.img || !data?.name) {
      throw new ServerError(400, "Missing required fields");
    }

    return { success: true, data };
  })
);

export default component$(() => {
  const nav = useNavigate();
  const createProduct = useCreateProduct();

  useTask$(({ track }) => {
    const created = track(() => createProduct.value);
    if (created?.success === true) nav("/");
  });

  const form = useSignal({ img: "", name: "" });

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
          name="name"
          value={form.value.name}
          onInput$={(e) =>
            (form.value.name = (e.target as HTMLInputElement).value)
          }
        />
        <button type="submit">Submit</button>
      </Form>
    </>
  );
});
