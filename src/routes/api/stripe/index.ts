import { type RequestHandler } from "@builder.io/qwik-city";
import Stripe from "stripe";

export const onPost: RequestHandler = async (requestEvent) => {
  const webhookSecret = requestEvent.env.get("STRIPE_WEBHOOK_SECRET");
  const stripe = new Stripe(requestEvent.env.get("SECRET_STRIPE_KEY") || "", {
    apiVersion: "2025-04-30.basil",
  });

  // const stripeEvent = await requestEvent.request.json();

  // if (!stripeEvent) {
  //   console.log("no stripe event");
  //   requestEvent.json(400, { ok: false, msg: "no stripe event" });
  //   return;
  // }

  const signature = requestEvent.request.headers.get("stripe-signature");

  console.log("signature ==>", signature);

  if (!signature) {
    console.log("no signature");
    requestEvent.json(400, { ok: false, msg: "no signature" });
    return;
  }

  if (!webhookSecret) {
    console.log("no webhook secret");
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

    console.log("Event ==>", event);

    requestEvent.json(200, { ok: true });
    return;
  } catch (e) {
    console.log("Error ==>", e);
    requestEvent.json(400, { ok: false, msg: e });
    return;
  }

  requestEvent.json(200, { ok: true });
  return;
};
