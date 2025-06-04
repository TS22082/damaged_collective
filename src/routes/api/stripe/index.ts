import { type RequestHandler } from "@builder.io/qwik-city";
import Stripe from "stripe";
import { getDb } from "~/shared/mongodb";

export const onPost: RequestHandler = async (requestEvent) => {
  const webhookSecret = requestEvent.env.get("STRIPE_WEBHOOK_SECRET");
  const mongoDbSecret = requestEvent.env.get("MONGO_URI") || "";
  const stripe = new Stripe(requestEvent.env.get("SECRET_STRIPE_KEY") || "", {
    apiVersion: "2025-04-30.basil",
  });

  const signature = requestEvent.request.headers.get("stripe-signature");

  if (!signature) {
    requestEvent.json(400, { ok: false, msg: "no signature" });
    console.log("no signature");
    return;
  }

  if (!webhookSecret) {
    requestEvent.json(400, { ok: false, msg: "no webhook secret" });
    return;
  }

  try {
    const bodyBuffer = Buffer.from(await requestEvent.request.arrayBuffer());
    const db = await getDb(mongoDbSecret);

    const event = await stripe.webhooks.constructEventAsync(
      bodyBuffer,
      signature as string,
      webhookSecret as string
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const eventId = event.id as string;

        if (!eventId) {
          console.log("No Event Id", event);
          break;
        }

        const itemAlreadyExists = await db
          .collection("orders")
          .findOne({ eventId });

        if (itemAlreadyExists) {
          console.log("item already exists");
          break;
        }

        await db.collection("orders").insertOne({
          eventId,
          ...event.data.object,
        });

        break;
      }

      case "checkout.session.async_payment_failed": {
        console.log("checkout session async_payment_failed", event);
        break;
      }

      default: {
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
