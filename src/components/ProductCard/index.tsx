import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import Layout from "./layout";
import { BsX, BsPencil, BsSave, BsTrash } from "@qwikest/icons/bootstrap";
import type { ProductCardPropsType } from "~/types";
import { Form } from "@builder.io/qwik-city";

export default component$<ProductCardPropsType>(
  ({ product, handleUiUpdate, handleDelete, updateItem }) => {
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

    useTask$(({ track }) => {
      const formState = track(() => updateItem.value);

      if (formState?.success === true) {
        handleUiUpdate({ ...product, brand: brand.value });
        editing.value = false;
      }
    });

    return (
      <Layout>
        <div q:slot="image" style={imageStyles}>
          {editing.value ? (
            <button
              class="icon-btn-base b-green"
              type="submit"
              form="edit-form"
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
            <button
              onClick$={async () => {
                if (window.confirm("Are you sure you want to delete?")) {
                  await handleDelete(product._id);
                }
              }}
              class="icon-btn-base b-red"
            >
              <BsTrash style={iconStyles} /> Delete
            </button>
          )}
        </div>

        {editing.value ? (
          <Form
            q:slot="brand"
            class="text-center"
            id="edit-form"
            action={updateItem}
          >
            <input type="hidden" name="_id" value={product._id} />
            <input
              name="brand"
              class="font-underdog text-subtitle text-center text-title shadowing rounded"
              value={brand.value}
              onInput$={(e) =>
                (brand.value = (e.target as HTMLInputElement).value)
              }
            />
          </Form>
        ) : (
          <h1 q:slot="brand" class="text-center">
            {product.brand}
          </h1>
        )}
      </Layout>
    );
  }
);
