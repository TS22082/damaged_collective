import { component$, useSignal } from "@builder.io/qwik";
import Layout from "./layout";
import { BsX, BsPencil, BsSave, BsTrash } from "@qwikest/icons/bootstrap";
import type { ProductCardPropsType } from "~/types";
import { $ } from "@builder.io/qwik";

export default component$<ProductCardPropsType>(({ product, handleSave }) => {
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

  const handleSubmit = $(async (e: Event) => {
    try {
      e.preventDefault();
      await handleSave({ ...product, brand: brand.value });
      editing.value = false;
    } catch (error) {
      console.error(error);
    }
  });

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
            onClick$={() => {
              brand.value = product.brand;
              editing.value = false;
            }}
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
        <form q:slot="brand" class="text-center" onSubmit$={handleSubmit}>
          <input
            name="brand"
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
