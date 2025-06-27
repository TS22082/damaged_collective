import { component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { type OrderTableProps } from "~/shared/types";
import {
  cursorOnHover,
  tableContainerStyles,
  tableContentRowStyles,
  tableHeaderStyles,
} from "./orders-table.css";

export default component$<OrderTableProps>(({ orders }) => {
  const nav = useNavigate();
  return (
    <table class={tableContainerStyles}>
      <tbody>
        <tr class={tableHeaderStyles}>
          <th>Name</th>
          <th>City / State</th>
          <th>Items</th>
          <th>Total</th>
          <th>Status</th>
        </tr>

        {orders.map((order) => (
          <tr
            class={[tableContentRowStyles, cursorOnHover]}
            key={order._id}
            onClick$={() => nav(`/admin/order/${order._id}`)}
          >
            <td>{order.name}</td>
            <td>
              {order.address.city}, {order.address.state}
            </td>
            <td>{order.itemsCount}</td>
            <td>${order.total}</td>
            <td>{order.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
