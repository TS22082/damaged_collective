import { type RequestHandler } from "@builder.io/qwik-city";
import Stripe from "stripe";

export const onPost: RequestHandler = async (requestEvent) => {
  const webhookSecret = requestEvent.env.get("STRIPE_WEBHOOK_SECRET");
  const stripe = new Stripe(requestEvent.env.get("SECRET_STRIPE_KEY") || "", {
    apiVersion: "2025-04-30.basil",
  });

  const signature = requestEvent.request.headers.get("stripe-signature");

  if (!signature) {
    requestEvent.json(400, { ok: false, msg: "no signature" });
    return;
  }

  if (!webhookSecret) {
    requestEvent.json(400, { ok: false, msg: "no webhook secret" });
    return;
  }

  try {
    const bodyBuffer = Buffer.from(await requestEvent.request.arrayBuffer());

    const event = await stripe.webhooks.constructEventAsync(
      bodyBuffer,
      signature as string,
      webhookSecret as string
    );

    switch (event.type) {
      case "checkout.session.completed": {
        console.log("checkout session completed", event);
        break;
      }

      case "checkout.session.async_payment_failed": {
        console.log("checkout session async_payment_failed", event);
        break;
      }

      default: {
        console.log("unknown event", event);
        break;
      }
    }

    requestEvent.json(200, { ok: true });
    return;
  } catch (e) {
    requestEvent.json(400, { ok: false, msg: e });
    return;
  }
};
