import type { DocumentHead } from "@builder.io/qwik-city";
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

export default component$(() => {
  const cart = useContext(CartContext);

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
            <button class={checkoutBtn}>Checkout</button>
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
