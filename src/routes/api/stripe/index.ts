import { type RequestHandler } from "@builder.io/qwik-city";
import { getDb } from "~/shared/mongodb";
import { getStripeClient } from "~/shared/stripeClient";

export const onPost: RequestHandler = async (requestEvent) => {
  const webhookSecret = requestEvent.env.get("STRIPE_WEBHOOK_SECRET");
  const mongoDbSecret = requestEvent.env.get("MONGO_URI") || "";
  const stripe = getStripeClient(requestEvent.env.get("SECRET_STRIPE_KEY"));

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
          requestEvent.json(400, { ok: false, msg: "item already exists" });
          break;
        }

        const session = event.data.object as Record<string, any>;

        const lineItems = await stripe.checkout.sessions.listLineItems(
          session.id as string,
          {
            limit: 100,
          }
        );

        if (!session.shipping) {
          console.log("no shipping", session);
          requestEvent.json(400, { ok: false, msg: "no shipping" });
          break;
        }

        await db.collection("orders").insertOne({
          eventId,
          sessionId: session.id,
          shipping: session.shipping,
          email: session.customer_details.email,
          items: lineItems.data,
          status: "open",
          meta: {
            ...session,
          },
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
