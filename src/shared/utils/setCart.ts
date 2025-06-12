import type { CartItem, CartState } from "../types";

export const setCart = (
  cart: { value: CartState },
  localStoredCart: CartItem[]
) => {
  cart.value = { items: localStoredCart };
};
