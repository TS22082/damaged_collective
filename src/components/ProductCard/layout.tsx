import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="card w-3 rounded">
      <Slot name="image" />
      <Slot name="brand" />
    </div>
  );
});
