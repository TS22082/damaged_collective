import { component$ } from "@builder.io/qwik";
import type { ProductCardPropsType } from "~/shared/types";
import { useNavigate } from "@builder.io/qwik-city";
import { cardContainer, imageContainer } from "./product.css";
import convertMoney from "~/shared/utils/convertMoney";

export default component$<ProductCardPropsType>(({ product }) => {
  const nav = useNavigate();

  const imageStyles = {
    backgroundImage: `url(${product.images[0]})`,
  };

  const formattedPrice = convertMoney(product.price.unit_amount as number);

  return (
    <button
      aria-label="Product Card"
      class={cardContainer}
      onClick$={() => {
        nav(`/product/${product.id}`);
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
