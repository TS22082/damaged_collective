import { type RequestHandler } from "@builder.io/qwik-city";
import { deleteProduct } from "~/services/deleteProduct";
import { getStripeProductsById } from "~/services/getStripeProductsById";
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

        const productsItems = lineItems.data.map((item: any) => ({
          productId: item.price.product as string,
          qty: item.quantity,
        }));

        try {
          const products = await getStripeProductsById(
            productsItems.map((item) => item.productId)
          );

          // const updatedItems = products?.map((product) => {
          //   const quantityUpdated = Number.parseInt(product.metadata.qty) - 1;

          //   const item = {
          //     ...product,
          //     metadata: {
          //       ...product.metadata,
          //       qty: quantityUpdated.toString(),
          //     },
          //   };

          //   return item;
          // });

          // const stripeUpdates = updatedItems?.map((item) => {
          //   if (Number.parseInt(item.metadata.qty) <= 0) {
          //     return stripe.products.update(item.id, {
          //       active: false,
          //     });
          //   }
          //   return stripe.products.update(item.id, {
          //     metadata: item.metadata,
          //   });
          // });

          const stripeUpdates = products?.map((product) => {
            const quantityUpdated = Number.parseInt(product.metadata.qty) - 1;

            if (quantityUpdated <= 0) {
              return stripe.products.update(product.id, {
                active: false,
              });
            }
            return stripe.products.update(product.id, {
              metadata: { ...product.metadata, qty: quantityUpdated },
            });
          });

          await Promise.all(stripeUpdates as unknown[]);
        } catch (error) {
          console.log("Error ==>", error);
        }

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
