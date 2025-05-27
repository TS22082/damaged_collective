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
import {
  container,
  formInput,
  formLabel,
  newFormContainer,
  nameAndPriceContainer,
  formBtnsContainer,
} from "./new.css";
import { btnOrange, btnPink, btnHover, btn } from "~/shared/styles.css";
import { getStripeClient } from "~/shared/stripeClient";

export const useCreateProduct = routeAction$(
  async (data: JSONObject, requestEvent: RequestEventAction) => {
    try {
      const stripe = getStripeClient(requestEvent.env.get("SECRET_STRIPE_KEY"));

      const product = await stripe.products.create({
        name: data.name as string,
        images: [data.img as string],
        description: data.description as string,
        metadata: {
          primaryImg: data.img as string,
        },
      });

      const price = await stripe.prices.create({
        product: product.id as string,
        currency: "usd",
        unit_amount: 60.0 * 100,
      });

      await stripe.products.update(product.id as string, {
        default_price: price.id as string,
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

    if (!data?.img || !data?.name || !data?.description || !data.price) {
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

  const form = useSignal({ img: "", name: "", price: "", description: "" });

  return (
    <div class={container}>
      <Form action={createProduct} class={newFormContainer}>
        <div class={nameAndPriceContainer}>
          <label class={formLabel} for="name">
            Name
          </label>
          <label class={formLabel} for="price">
            Price
          </label>
          <input
            name="name"
            type="text"
            value={form.value.name}
            class={formInput}
            onInput$={(e) =>
              (form.value.name = (e.target as HTMLInputElement).value)
            }
          />
          <input
            name="price"
            type="number"
            value={form.value.price}
            class={formInput}
            onInput$={(e) =>
              (form.value.price = (e.target as HTMLInputElement).value)
            }
          />
        </div>
        <label class={formLabel} for="img">
          Image
        </label>
        <input
          name="img"
          type="text"
          value={form.value.img}
          class={formInput}
          onInput$={(e) =>
            (form.value.img = (e.target as HTMLInputElement).value)
          }
        />
        <label class={formLabel} for="description">
          Description
        </label>
        <textarea
          name="description"
          rows={10}
          cols={50}
          class={formInput}
        ></textarea>
        <div class={formBtnsContainer}>
          <button
            disabled={createProduct.isRunning}
            type="button"
            onClick$={async () => {
              await nav("/");
            }}
            class={[btn, btnOrange, btnHover]}
          >
            Cancel
          </button>
          <button
            disabled={createProduct.isRunning}
            type="submit"
            class={[btn, btnPink, btnHover]}
          >
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
});
