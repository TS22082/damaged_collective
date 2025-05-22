import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import Layout from "./layout";
import { BsX, BsPencil, BsSave, BsTrash } from "@qwikest/icons/bootstrap";
import type { ProductCardPropsType } from "~/types";
import { Form } from "@builder.io/qwik-city";

export default component$<ProductCardPropsType>(
  ({ product, handleUiUpdate, handleDelete, handleUpdate }) => {
    const editing = useSignal(false);

    const imageStyles = {
      height: "600px",
      backgroundImage: `url(${product.images[0]})`,
      backgroundSize: "fill",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      overflow: "hidden",
      margin: "20px",
      display: "flex",
      justifyContent: "space-between",
    };

    const iconStyles = {
      transform: "translateY(1px)",
    };

    const name = useSignal(product.name);

    useTask$(({ track }) => {
      const update = track(() => handleUpdate.value);
      if (update?.success === true) {
        handleUiUpdate({ ...product, name: name.value });
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
                name.value = product.name;
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
                  await handleDelete(product.id);
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
            q:slot="name"
            class="text-center"
            id="edit-form"
            action={handleUpdate}
          >
            <input type="hidden" name="id" value={product.id} />
            <input
              name="name"
              class="font-underdog text-subtitle text-center text-title shadowing rounded"
              value={name.value}
              onInput$={(e) =>
                (name.value = (e.target as HTMLInputElement).value)
              }
            />
          </Form>
        ) : (
          <h1 q:slot="name" class="text-center">
            {product.name}
          </h1>
        )}
      </Layout>
    );
  }
);
