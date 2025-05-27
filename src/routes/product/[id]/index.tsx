import { component$, useContext } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { ServerError } from "@builder.io/qwik-city/middleware/request-handler";
import { getStripeClient } from "~/shared/stripeClient";
import {
  productContainer,
  productImage,
  productInfo,
  productPageContainer,
} from "../product.css";
import { CartContext } from "~/contexts";
import { btn, btnHover, btnPink } from "~/shared/styles.css";

export const useProductLoader = routeLoader$(async (requestEvent) => {
  try {
    const stripe = getStripeClient(requestEvent.env.get("SECRET_STRIPE_KEY"));
    const product = await stripe.products.retrieve(requestEvent.params.id);
    const price = await stripe.prices.retrieve(product.default_price as string);

    const formattedPrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format((price.unit_amount as number) * 0.01);

    return {
      ...product,
      formattedPrice,
      unformattedPrice: price.unit_amount,
    };
  } catch (e) {
    throw new ServerError(500, e);
  }
});

export default component$(() => {
  const product = useProductLoader();
  const cart = useContext(CartContext);

  return (
    <div class={productPageContainer}>
      <div class={productContainer}>
        <div
          style={{ backgroundImage: `url(${product.value.images[0]})` }}
          class={productImage}
        />
        <div class={productInfo}>
          <h1 style={{ margin: 0 }}>{product.value.name}</h1>
          <h2 style={{ margin: 0 }}>{product.value.description}</h2>
          <p style={{ margin: 0 }}>{product.value.formattedPrice}</p>
          <button
            class={[btn, btnPink, btnHover]}
            onClick$={() => {
              cart.value = {
                ...cart.value,
                items: [
                  ...cart.value.items,
                  {
                    price_id: (product.value.default_price as string) || "",
                    product_id: product.value.id || "",
                    name: product.value.name || "",
                    image: product.value.images[0] || "",
                    description: product.value.description || "",
                    price: product.value.unformattedPrice || 0,
                    qty: 1,
                  },
                ],
              };

              localStorage.setItem("cart", JSON.stringify(cart.value.items));
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Product Page",
  meta: [
    {
      name: "Specific Product",
      content: "Product Page",
    },
    {
      name: "image",
      content:
        "https://res.cloudinary.com/geek-centric/image/upload/v1747081873/damaged_collective/output_zjor1f.jpg",
    },
  ],
};
