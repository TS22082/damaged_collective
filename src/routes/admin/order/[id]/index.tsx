import {
  component$,
  Resource,
  useResource$,
  useSignal,
} from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { getOrder } from "~/services/getOrder";
import { type OrderRawType } from "~/shared/types";
import { orderContainer } from "../order.css";

export default component$(() => {
  const loc = useLocation();
  const orderSignal = useSignal<OrderRawType | null>();

  const orderResource = useResource$(async () => {
    try {
      const order = await getOrder(loc.params.id);
      orderSignal.value = order as OrderRawType;
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div class={orderContainer}>
      <Resource
        value={orderResource}
        onPending={() => <div>Loading...</div>}
        onRejected={(error) => <div>{error.message}</div>}
        onResolved={() => (
          <div>
            <p>{orderSignal.value?.email}</p>
            <div>
              <h2>Address</h2>
              <p>{orderSignal.value?.shipping.name}</p>
              <p>{orderSignal.value?.shipping.address.line1}</p>
              {orderSignal.value?.shipping.address.line2 && (
                <p>{orderSignal.value.shipping.address.line2}</p>
              )}
              <p>
                {orderSignal.value?.shipping.address.city},{" "}
                {orderSignal.value?.shipping.address.postal_code},{" "}
                {orderSignal.value?.shipping.address.state}
              </p>
            </div>
          </div>
        )}
      />
    </div>
  );
});
