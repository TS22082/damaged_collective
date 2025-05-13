import { component$, useSignal } from "@builder.io/qwik";
import Layout from "./layout";
import { BsX, BsPencil, BsSave, BsTrash } from "@qwikest/icons/bootstrap";

type ProductCardProps = {
  product: {
    _id: string;
    brand: string;
    img: string;
  };
  handleSave: any;
};

export default component$<ProductCardProps>(({ product, handleSave }) => {
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

  const iconStyles = {
    transform: "translateY(1px)",
  };

  const brand = useSignal(product.brand);

  return (
    <Layout>
      <div q:slot="image" style={imageStyles}>
        {editing.value ? (
          <button
            class="icon-btn-base b-green"
            onClick$={async () => {
              await handleSave({ ...product, brand: brand.value });
              editing.value = false;
            }}
          >
            <BsSave style={iconStyles} /> Save
          </button>
        ) : (
          <button
            class="icon-btn-base b-orange"
            onClick$={() => (editing.value = true)}
          >
            <BsPencil style={iconStyles} /> Edit
          </button>
        )}

        {editing.value ? (
          <button
            onClick$={() => (editing.value = false)}
            class="icon-btn-base b-red"
          >
            <BsX style={iconStyles} /> Cancel
          </button>
        ) : (
          <button class="icon-btn-base b-red">
            <BsTrash style={iconStyles} /> Delete
          </button>
        )}
      </div>

      {editing.value ? (
        <form q:slot="brand" class="text-center">
          <input
            class="font-underdog text-subtitle text-center text-title shadowing rounded"
            value={brand.value}
            onInput$={(e) =>
              (brand.value = (e.target as HTMLInputElement).value)
            }
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
