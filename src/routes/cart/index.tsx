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
  checkoutFormInputs,
  checkoutFormItem,
  cityStateContainer,
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
          <div class={checkoutFormInputs}>
            <p>Fill out your shipping details</p>
            <div
              style={{
                width: "80%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <input
                style={{
                  width: "45%",
                }}
                name="firstName"
                placeholder="First Name"
                class={[formInput, checkoutFormItem]}
                type="text"
                value={""}
              />
              <input
                style={{
                  width: "45%",
                }}
                name="lastName"
                placeholder="Last Name"
                class={[formInput, checkoutFormItem]}
                type="text"
                value={""}
              />
            </div>
            <input
              name="street"
              placeholder="Street"
              class={[formInput, checkoutFormItem]}
              type="text"
              value={""}
            />
            <input
              name="street2"
              placeholder="Street 2"
              class={[formInput, checkoutFormItem]}
              type="text"
              value={""}
            />

            <div class={cityStateContainer}>
              <input
                name="city"
                placeholder="City"
                class={formInput}
                type="text"
                value={""}
              />
              <input
                name="zip"
                placeholder="Zip"
                class={formInput}
                type="text"
                value={""}
              />
              <select value={"AK"} name="state" class={formInput}>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
              </select>
            </div>
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
