import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { ServerError } from "@builder.io/qwik-city/middleware/request-handler";
import { getStripeClient } from "~/shared/stripeClient";
import { productContainer, productPageContainer } from "../product.css";

export const useProductLoader = routeLoader$(async (requestEvent) => {
  try {
    const stripe = getStripeClient(requestEvent.env.get("SECRET_STRIPE_KEY"));
    const product = await stripe.products.retrieve(requestEvent.params.id);
    const price = await stripe.prices.retrieve(product.default_price as string);
    console.log("Price: ", price);

    const formattedPrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format((price.unit_amount as number) * 0.01);

    return { ...product, formattedPrice };
  } catch (e) {
    throw new ServerError(500, e);
  }
});

export default component$(() => {
  const product = useProductLoader();
  return (
    <div class={[productPageContainer]}>
      <div class={productContainer}>
        <h1>Product Page</h1>
        <div>
          <p>{product.value.name}</p>
          <p>{product.value.description}</p>
          <p>{product.value.formattedPrice}</p>
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
