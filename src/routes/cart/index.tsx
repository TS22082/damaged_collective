import { server$, useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { component$, useContext } from "@builder.io/qwik";
import { CartContext } from "~/contexts";
import {
  cartWrapper,
  title,
  emptyCart,
  cartList,
  cartItem,
  itemImage,
  itemInfo,
  itemName,
  itemDescription,
  itemPrice,
  qtyActions,
  itemQty,
  removeBtn,
  summary,
  checkoutBtn,
} from "./cart.css";
import { type CartState } from "~/shared/types";
import { getStripeClient } from "~/shared/stripeClient";

export const createCheckoutSession = server$(async function (cart: CartState) {
  try {
    const itemsForStripe = cart.items.map((item) => ({
      price: item.price_id,
      quantity: item.qty,
    }));

    const stripeSecretKey = this.env.get("SECRET_STRIPE_KEY");
    const stripe = getStripeClient(stripeSecretKey);

    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: itemsForStripe,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/",
    });

    return checkoutSession.url as string;
  } catch (error) {
    console.error(error);
  }
});

export default component$(() => {
  const cart = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.value.items.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  return (
    <div class={cartWrapper}>
      <h1 class={title}>Shopping Cart</h1>
      {cart.value.items.length === 0 ? (
        <div class={emptyCart}>Your cart is empty.</div>
      ) : (
        <>
          <ul class={cartList}>
            {cart.value.items.map((item) => (
              <li key={item.product_id} class={cartItem}>
                <div
                  style={{ backgroundImage: `url(${item.image})` }}
                  class={itemImage}
                />
                <div class={itemInfo}>
                  <div class={itemName}>{item.name}</div>
                  <div class={itemDescription}>{item.description}</div>
                  <div class={itemPrice}>${(item.price / 100).toFixed(2)}</div>
                </div>
                <div class={qtyActions}>
                  <span class={itemQty}>x{item.qty}</span>
                  <button
                    class={removeBtn}
                    aria-label="Remove from cart"
                    onClick$={() => {
                      cart.value = {
                        ...cart.value,
                        items: cart.value.items.filter(
                          (ci) => ci.product_id !== item.product_id
                        ),
                      };

                      localStorage.setItem(
                        "cart",
                        JSON.stringify(cart.value.items)
                      );
                    }}
                  >
                    ×
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div class={summary}>
            <div>Total: ${total ? (total / 100).toFixed(2) : "0.00"}</div>
            <button
              class={checkoutBtn}
              type="button"
              onClick$={async () => {
                try {
                  const checkoutUrl = await createCheckoutSession(cart.value);
                  await navigate(checkoutUrl);
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Cart ",
  meta: [
    {
      name: "Shopping cart",
      content: "This is the shopping cart page",
    },
  ],
};
