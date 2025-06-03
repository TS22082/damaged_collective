import { type RequestHandler } from "@builder.io/qwik-city";
import Stripe from "stripe";

export const onPost: RequestHandler = async (requestEvent) => {
  const webhookSecret = requestEvent.env.get("STRIPE_WEBHOOK_SECRET");
  const stripe = new Stripe(requestEvent.env.get("SECRET_STRIPE_KEY") || "", {
    apiVersion: "2025-04-30.basil",
  });

  console.log("webhookSecret ==>", webhookSecret);
  const stripeEvent = await requestEvent.request.json();

  if (!stripeEvent) {
    return requestEvent.json(400, { ok: false });
  }

  const signature = requestEvent.request.headers.get("stripe-signature");

  if (!signature) {
    return requestEvent.json(400, { ok: false });
  }

  if (!webhookSecret) {
    return requestEvent.json(400, { ok: false });
  }

  try {
    const event = await stripe.webhooks.constructEventAsync(
      stripeEvent.raw,
      signature,
      webhookSecret
    );

    console.log("event ==>", event);
  } catch (e) {
    return requestEvent.json(400, { ok: false });
  }

  console.log("stripeEvent ==>", stripeEvent);
  requestEvent.json(200, { ok: true });
};
