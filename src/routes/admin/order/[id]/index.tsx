import {
  component$,
  Resource,
  useResource$,
  useSignal,
} from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { getOrder } from "~/services/getOrder";
import { type ItemOrderType, type OrderRawType } from "~/shared/types";
import {
  contactAndShippingContainer,
  headerTextStyle,
  itemTextStyle,
  orderContainer,
  orderDetailHeader,
  orderDetailsContainer,
  orderItemTable,
  tableHeaderStyle,
  tableRowStyle,
} from "../order.css";
import { getStripeProductsById } from "~/services/getStripeProductsById";

export default component$(() => {
  const loc = useLocation();
  const orderSignal = useSignal<OrderRawType | null>();

  const orderResource = useResource$(async () => {
    try {
      const order = await getOrder(loc.params.id);

      const productIds = (order as OrderRawType).items.map(
        (item: any) => item.price.product
      );

      const products = await getStripeProductsById(productIds);
      console.log("products ==>", products);

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
          <div class={orderDetailsContainer}>
            <div class={contactAndShippingContainer}>
              <div>
                <h3 class={orderDetailHeader}>Contact Info</h3>
                <p>{orderSignal.value?.email}</p>
                <p>
                  {orderSignal.value?.shipping.phone
                    ? orderSignal.value.shipping.phone
                    : "No phone number provided"}
                </p>
              </div>

              <div>
                <h3 class={orderDetailHeader}>Shipping Info</h3>
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
            <table class={orderItemTable}>
              <thead class={tableHeaderStyle}>
                <tr class={tableRowStyle}>
                  <th class={headerTextStyle}>Product</th>
                  <th class={headerTextStyle}>Quantity</th>
                  <th class={headerTextStyle}>Price</th>
                </tr>
              </thead>
              <tbody>
                {orderSignal.value?.items.map(
                  (item: ItemOrderType, index: number) => (
                    <tr key={index} class={tableRowStyle}>
                      <td class={itemTextStyle}>{item.description}</td>
                      <td class={itemTextStyle}>{item.quantity}</td>
                      <td class={itemTextStyle}>
                        ${(item.price.unit_amount / 100).toFixed(2)}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      />
    </div>
  );
});
