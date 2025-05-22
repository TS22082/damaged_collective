import { createContextId } from "@builder.io/qwik";
import type { Signal } from "@builder.io/qwik";
import type { CartState } from "~/shared/types";

export const CartContext = createContextId<Signal<CartState>>("cart-context");
