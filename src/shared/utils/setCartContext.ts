import type { CartItem, CartState } from "../types";

export const setCartContext = (
  cart: { value: CartState },
  localStoredCart: CartItem[]
) => {
  cart.value = { items: localStoredCart };
};
