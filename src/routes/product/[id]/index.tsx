import {
  component$,
  Resource,
  useContext,
  useResource$,
} from "@builder.io/qwik";
import { useLocation, type DocumentHead } from "@builder.io/qwik-city";

import {
  productContainer,
  productImage,
  productInfo,
  productPageContainer,
} from "../product.css";
import { CartContext } from "~/contexts";
import { btn, btnHover, btnPink } from "~/shared/styles.css";
import { getProductById } from "~/services/getProductById";
import { ServerError } from "@builder.io/qwik-city/middleware/request-handler";

export default component$(() => {
  const cart = useContext(CartContext);
  const location = useLocation();

  const productResource = useResource$(async () => {
    const productId = location.params.id;

    try {
      const productData = await getProductById(productId);
      return productData;
    } catch (error) {
      throw new ServerError(500, error);
    }
  });

  return (
    <div class={productPageContainer}>
      <Resource
        value={productResource}
        onPending={() => <p>Loading...</p>}
        onRejected={(error) => <p>{error.message}</p>}
        onResolved={(product) => (
          <div class={productContainer}>
            <div
              style={{ backgroundImage: `url(${product.images[0]})` }}
              class={productImage}
            />
            <div class={productInfo}>
              <h1 style={{ margin: 0 }}>{product.name}</h1>
              <h2 style={{ margin: 0 }}>{product.description}</h2>
              <p style={{ margin: 0 }}>{product.formattedPrice}</p>
              <button
                class={[btn, btnPink, btnHover]}
                onClick$={() =>
                  (cart.value = {
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
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
      />
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
