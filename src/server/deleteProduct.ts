import { server$ } from "@builder.io/qwik-city";
import type { Session } from "@auth/qwik";
import { ServerError } from "@builder.io/qwik-city/middleware/request-handler";
import Stripe from "stripe";

export const deleteProduct = server$(async function (id: string) {
  try {
    const session: Session | null = this.sharedMap.get("session");

    if (!session || session.user?.email !== "ts22082@gmail.com") {
      throw new ServerError(401, "Not authorized");
    }

    const stripe = new Stripe(this.env.get("SECRET_STRIPE_KEY") || "", {
      apiVersion: "2025-04-30.basil",
    });

    const result = await stripe.products.update(id, {
      active: false,
    });

    return result;
  } catch (e) {
    throw new ServerError(500, e);
  }
});
