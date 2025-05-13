import { component$, useSignal } from "@builder.io/qwik";
import { Form, useNavigate } from "@builder.io/qwik-city";
import { $ } from "@builder.io/qwik";
import { createProduct } from "~/server/createProduct";

export default component$(() => {
  const nav = useNavigate();
  const form = useSignal({ img: "", brand: "" });

  const handleSubmit = $(async (e: Event) => {
    try {
      e.preventDefault();
      await createProduct({
        img: form.value.img,
        brand: form.value.brand,
      });
      nav("/");
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <h1>New Board Page</h1>
      <div>This is the new board page</div>
      <Form onSubmit$={handleSubmit}>
        <label>Image</label>
        <input
          type="text"
          name="img"
          value={form.value.img}
          onInput$={(e) =>
            (form.value.img = (e.target as HTMLInputElement).value)
          }
        />
        <label>Brand</label>
        <input
          type="text"
          name="brand"
          value={form.value.brand}
          onInput$={(e) =>
            (form.value.brand = (e.target as HTMLInputElement).value)
          }
        />
        <button type="submit">Submit</button>
      </Form>
    </>
  );
});
