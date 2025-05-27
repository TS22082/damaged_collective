import { component$ } from "@builder.io/qwik";
import type { ProductCardPropsType } from "~/shared/types";
import { useNavigate } from "@builder.io/qwik-city";
import { cardContainer, imageContainer } from "./product.css";

export default component$<ProductCardPropsType>(({ product, priceMap }) => {
  const nav = useNavigate();

  const imageStyles = {
    backgroundImage: `url(${product.images[0]})`,
  };

  const priceAsNumber = priceMap.get(product.default_price)?.unit_amount;
  const formattedPrice = priceAsNumber
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(priceAsNumber * 0.01)
    : "";

  return (
    <button
      aria-label="Product Card"
      class={cardContainer}
      onClick$={async () => {
        await nav(`/product/${product.id}`);
      }}
    >
      <div
        aria-label="Product Image"
        class={imageContainer}
        style={imageStyles}
      />
      <h1 area-label="Product Name" class="text-center">
        {product.name}
      </h1>
      <p aria-label="Product Description" class="text-center">
        {product.description} - {formattedPrice}
      </p>
    </button>
  );
});
