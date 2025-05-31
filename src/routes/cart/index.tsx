import { Form, useNavigate, type DocumentHead } from "@builder.io/qwik-city";
import { $, component$, useContext, useSignal } from "@builder.io/qwik";
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
  divider,
} from "./cart.css";
import { formInput } from "../new_board/new.css";
import { createCheckoutSession } from "../api/createCheckoutSession";
import { useSession } from "../plugin@auth";

export default component$(() => {
  const cart = useContext(CartContext);
  const navigate = useNavigate();
  const formSignal = useSignal({
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });

  const session = useSession();

  const updateForm = $((key: string, value: string) => {
    formSignal.value = {
      ...formSignal.value,
      [key]: value,
    };
  });

  const total = cart.value.items.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  const formIsValid =
    formSignal.value.firstName.length > 0 &&
    formSignal.value.lastName.length > 0 &&
    formSignal.value.address.length > 0 &&
    formSignal.value.city.length > 0 &&
    formSignal.value.state.length > 0 &&
    formSignal.value.zip.length > 0;

  return (
    <div class={cartWrapper}>
      <h1 class={title}>Shopping Cart</h1>
      {cart.value.items.length === 0 ? (
        <p class={emptyCart}>Your cart is empty.</p>
      ) : (
        <Form class={formContainer}>
          <div class={checkoutFormInputs}>
            {session.value?.user ? (
              <>
                <p>
                  Fill out your shipping details {formSignal.value.firstName}
                </p>
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
                    onInput$={(e) =>
                      updateForm(
                        "firstName",
                        (e.target as HTMLInputElement).value
                      )
                    }
                    name="firstName"
                    placeholder="First Name"
                    class={[formInput, checkoutFormItem]}
                    type="text"
                    value={formSignal.value.firstName}
                  />
                  <input
                    style={{
                      width: "45%",
                    }}
                    onInput$={(e) =>
                      updateForm(
                        "lastName",
                        (e.target as HTMLInputElement).value
                      )
                    }
                    name="lastName"
                    placeholder="Last Name"
                    class={[formInput, checkoutFormItem]}
                    type="text"
                    value={formSignal.value.lastName}
                  />
                </div>
                <input
                  name="address"
                  onInput$={(e) =>
                    updateForm("address", (e.target as HTMLInputElement).value)
                  }
                  placeholder="Address"
                  class={[formInput, checkoutFormItem]}
                  type="text"
                  value={formSignal.value.address}
                />
                <input
                  name="street2"
                  onInput$={(e) =>
                    updateForm("address2", (e.target as HTMLInputElement).value)
                  }
                  placeholder="Apt, PO box, etc"
                  class={[formInput, checkoutFormItem]}
                  type="text"
                  value={formSignal.value.address2}
                />
                <div class={cityStateContainer}>
                  <input
                    name="city"
                    onInput$={(e) =>
                      updateForm("city", (e.target as HTMLInputElement).value)
                    }
                    placeholder="City"
                    class={formInput}
                    type="text"
                    value={formSignal.value.city}
                  />
                  <input
                    name="zip"
                    onInput$={(e) =>
                      updateForm("zip", (e.target as HTMLInputElement).value)
                    }
                    placeholder="Zip"
                    class={formInput}
                    type="text"
                    value={formSignal.value.zip}
                  />
                  <select
                    value={formSignal.value.state}
                    onInput$={(e) =>
                      updateForm("state", (e.target as HTMLInputElement).value)
                    }
                    name="state"
                    class={formInput}
                  >
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                  </select>
                </div>
              </>
            ) : (
              <p>
                You need to be signed in to checkout. Please log in to fill out
                your shipping information.
              </p>
            )}
          </div>
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
              <button
                class={checkoutBtn}
                style={{
                  cursor: formIsValid ? "pointer" : "not-allowed",
                }}
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
