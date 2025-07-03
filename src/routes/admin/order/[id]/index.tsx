import {
  $,
  component$,
  Resource,
  useResource$,
  useSignal,
} from "@builder.io/qwik";
import { Form, useLocation } from "@builder.io/qwik-city";
import { getOrder } from "~/services/getOrder";
import type {
  OrderStatusType,
  ItemOrderType,
  OrderRawType,
} from "~/shared/types";
import {
  contactAndShippingContainer,
  formContainer,
  headerTextStyle,
  itemTextStyle,
  orderContainer,
  orderDetailHeader,
  orderDetailsContainer,
  orderItemTable,
  tableHeaderStyle,
  tableRowStyle,
} from "../order.css";
import { SHIPPING_STATUS } from "~/shared/constants";
import { updateOrderStatus } from "~/services/updateOrderStatus";

export default component$(() => {
  const loc = useLocation();
  const orderSignal = useSignal<OrderRawType | null>();

  const orderResource = useResource$(async () => {
    const orderId = loc.params.id;
    if (!orderId) {
      throw new Error("Cannot get order");
    }
    try {
      const order = await getOrder(orderId);
      orderSignal.value = order as OrderRawType;
    } catch (error) {
      throw new Error("Cannot get order");
    }
  });

  const handleChange = $(async (e: InputEvent) => {
    if (!e.target) return;

    const target = e.target as HTMLInputElement;

    try {
      const orderId = orderSignal.value?._id;
      const newStatus = target.name as OrderStatusType;

      if (orderId) {
        await updateOrderStatus(orderId, newStatus);
        orderSignal.value = {
          ...orderSignal.value,
          status: newStatus,
        } as OrderRawType;
      }
    } catch (error) {
      throw new Error("cannot change status");
    }
  });

  return (
    <div class={orderContainer}>
      <Resource
        value={orderResource}
        onPending={() => <p style={{ marginTop: "20px" }}>Loading...</p>}
        onRejected={(error) => <p>{error.message}</p>}
        onResolved={() => (
          <>
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
            <Form class={formContainer}>
              <p>Open</p>
              <input
                name={SHIPPING_STATUS.OPEN}
                onInput$={handleChange}
                checked={orderSignal.value?.status === SHIPPING_STATUS.OPEN}
                type="radio"
              />
              <p>Shipped</p>
              <input
                name={SHIPPING_STATUS.SHIPPED}
                onInput$={handleChange}
                checked={orderSignal.value?.status === SHIPPING_STATUS.SHIPPED}
                type="radio"
              />
              <p>Complete</p>
              <input
                name={SHIPPING_STATUS.COMPLETE}
                onInput$={handleChange}
                checked={orderSignal.value?.status === SHIPPING_STATUS.COMPLETE}
                type="radio"
              />
              <p>Cancelled</p>
              <input
                name={SHIPPING_STATUS.CANCELLED}
                onInput$={handleChange}
                checked={
                  orderSignal.value?.status === SHIPPING_STATUS.CANCELLED
                }
                type="radio"
              />
            </Form>
          </>
        )}
      />
    </div>
  );
});
