import { useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { component$, useContext } from "@builder.io/qwik";
import { CartContext, UserContext } from "~/contexts";
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
  formContainer,
  cartItems,
  divider,
} from "./cart.css";
import { createCheckoutSession } from "../api/createCheckoutSession";

export default component$(() => {
  const cart = useContext(CartContext);
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const total = cart.value.items.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  return (
    <div class={cartWrapper}>
      <h1 class={title}>Shopping Cart</h1>
      {cart.value.items.length === 0 ? (
        <p class={emptyCart}>Your cart is empty.</p>
      ) : (
        <div class={formContainer}>
          <div class={cartItems}>
            <ul class={cartList}>
              {cart.value.items.map((item) => (
                <>
                  <li key={item.product_id} class={cartItem}>
                    <div
                      style={{ backgroundImage: `url(${item.image})` }}
                      class={itemImage}
                    />
                    <div class={itemInfo}>
                      <p class={itemName}>{item.name}</p>
                      <p class={itemDescription}>{item.description}</p>
                      <p class={itemPrice}>${(item.price / 100).toFixed(2)}</p>
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
                  <div class={divider} />
                </>
              ))}
            </ul>
            <div class={summary}>
              <p>Total: ${total ? (total / 100).toFixed(2) : "0.00"}</p>

              {user.value && (
                <button
                  class={checkoutBtn}
                  type="button"
                  onClick$={async () => {
                    try {
                      const checkoutUrl = await createCheckoutSession(
                        cart.value
                      );
                      await navigate(checkoutUrl);
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                >
                  Checkout
                </button>
              )}
            </div>
          </div>
        </div>
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
