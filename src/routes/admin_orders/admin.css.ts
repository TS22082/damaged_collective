import { style } from "@vanilla-extract/css";

export const ordersContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const orderContainer = style({
  marginTop: "20px",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  backgroundColor: "#f5f5f5",
  display: "flex",
  width: "600px",
  justifyContent: "space-between",
  cursor: "pointer",
});
