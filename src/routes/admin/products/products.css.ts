import { globalStyle, style } from "@vanilla-extract/css";

export const productsContainer = style({
  marginTop: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
});

export const productRow = style({
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
  justifyContent: "space-between",
  border: "1px solid #ccc",
  gap: "20px",
  padding: "10px",
  borderRadius: "5px",
});

globalStyle(`${productRow} p`, {
  width: "300px",
  overflow: "hidden",
  textOverflow: "ellipsis",
});
