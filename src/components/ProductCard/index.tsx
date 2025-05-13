import { component$, useSignal } from "@builder.io/qwik";
import Layout from "./layout";
import { BsCart, BsPencil, BsSave, BsTrash } from "@qwikest/icons/bootstrap";

type ProductCardProps = {
  product: {
    _id: string;
    brand: string;
    img: string;
  };
};

export default component$<ProductCardProps>(({ product }) => {
  const imageStyles = {
    height: "600px",
    backgroundImage: `url(${product.img})`,
    backgroundSize: "fill",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
    margin: "20px",
    display: "flex",
    justifyContent: "space-between",
  };

  const editing = useSignal(false);

  return (
    <Layout>
      <div q:slot="image" style={imageStyles}>
        {editing.value ? (
          <button
            class="icon-btn-base b-green"
            onClick$={() => {
              editing.value = false;
            }}
          >
            <BsSave />
          </button>
        ) : (
          <button
            class="icon-btn-base b-orange"
            onClick$={() => {
              editing.value = true;
            }}
          >
            <BsPencil />
          </button>
        )}

        <button class="icon-btn-base b-red">
          <BsTrash />
        </button>
      </div>
      {!editing.value ? "true" : "false"}
      {editing.value ? (
        <form q:slot="brand" class="text-center">
          <input
            class="font-underdog text-subtitle text-center text-title"
            value={product.brand}
          />
        </form>
      ) : (
        <h1 q:slot="brand" class="text-center">
          {product.brand}
        </h1>
      )}
    </Layout>
  );
});
