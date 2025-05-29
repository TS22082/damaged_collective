import { server$ } from "@builder.io/qwik-city";
import { getStripeClient } from "~/shared/stripeClient";
import { type CartState } from "~/shared/types";

type itemType = {
  price_id: string;
  qty: number;
};

export const createCheckoutSession = server$(async function (cart: CartState) {
  try {
    const itemsForStripe = cart.items.map((item: itemType) => ({
      price: item.price_id,
      quantity: item.qty,
    }));

    const stripeSecretKey = this.env.get("SECRET_STRIPE_KEY");
    const domain = this.env.get("DOMAIN_URL");
    const stripe = getStripeClient(stripeSecretKey);

    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: itemsForStripe,
      mode: "payment",
      success_url: `${domain}success`,
      cancel_url: domain,
    });

    return checkoutSession.url as string;
  } catch (error) {
    console.error(error);
  }
});
