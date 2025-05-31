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
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      automatic_tax: {
        // to get this to work I need to set the tax code in the stripe dashboard
        // https://dashboard.stripe.com/tax-settings
        enabled: true,
      },
    });

    return checkoutSession.url as string;
  } catch (error) {
    console.error(error);
  }
});
