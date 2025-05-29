import { Form, useNavigate, type DocumentHead } from "@builder.io/qwik-city";
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
  formContainer,
  cartItems,
  formInputs,
} from "./cart.css";
import { formInput } from "../new_board/new.css";
import { createCheckoutSession } from "../api/createCheckoutSession";

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
        <p class={emptyCart}>Your cart is empty.</p>
      ) : (
        <Form class={formContainer}>
          <div class={formInputs}>
            <p>Fill out your shipping details</p>
            <input name="street" class={formInput} type="text" value={""} />
            <input name="street2" class={formInput} type="text" value={""} />
            <input name="city" class={formInput} type="text" value={""} />
            <input name="zip" class={formInput} type="text" value={""} />
            <input name="country" class={formInput} type="text" value={""} />
            <input class={formInput} type="text" value={""} />
          </div>
          <div class={cartItems}>
            <ul class={cartList}>
              {cart.value.items.map((item) => (
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
              ))}
            </ul>
            <div class={summary}>
              <p>Total: ${total ? (total / 100).toFixed(2) : "0.00"}</p>
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
          </div>
        </Form>
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
