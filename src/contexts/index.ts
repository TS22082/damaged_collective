import { createContextId } from "@builder.io/qwik";
import type { Signal } from "@builder.io/qwik";
import type { CartState, UserType } from "~/shared/types";

export const CartContext = createContextId<Signal<CartState>>("cart-context");
export const UserContext =
  createContextId<Signal<UserType | null>>("user-context");
