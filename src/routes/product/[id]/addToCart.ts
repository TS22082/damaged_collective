import { $, type Signal } from "@builder.io/qwik";
import type { ProductSingleViewtType } from "~/shared/types";

export const addToCart = $((cart: Signal, product: ProductSingleViewtType) => {
  cart.value = {
    ...cart.value,
    items: [
      ...cart.value.items,
      {
        price_id: product.default_price as string,
        product_id: product.id,
        name: product.name,
        image: product.images[0],
        description: product.description || "",
        price: product.unformattedPrice || 0,
        qty: 1,
      },
    ],
  };
});
