import { style } from "@vanilla-extract/css";

export const cartWrapper = style({
  width: "60%",
  minWidth: "400px",
  margin: "20px auto",
  padding: "2rem",
  background: "#fff",
  borderRadius: "8px",
  boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
});

export const title = style({
  fontSize: "2rem",
  marginBottom: "1.5rem",
  fontWeight: 700,
  textAlign: "center",
});

export const emptyCart = style({
  textAlign: "center",
  color: "#888",
  margin: "2rem 0",
});

export const cartList = style({
  listStyle: "none",
  padding: 0,
  margin: 0,
});

export const cartItem = style({
  display: "flex",
  alignItems: "center",
  gap: "2rem",
});

export const itemImage = style({
  width: 80,
  height: 80,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  borderRadius: 8,
  border: "1px solid #eee",
});

export const itemInfo = style({
  flex: 1,
});

export const itemName = style({
  fontSize: "1.1rem",
  fontWeight: 500,
  marginBottom: 4,
});

export const itemDescription = style({
  fontSize: "0.95rem",
  color: "#666",
  marginBottom: 2,
});

export const itemPrice = style({
  fontWeight: 600,
});

export const itemQty = style({
  fontSize: "0.95rem",
  fontWeight: 500,
  margin: "0 1rem",
});

export const qtyActions = style({
  display: "flex",
  alignItems: "center",
  gap: ".5rem",
});

export const removeBtn = style({
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "#d33",
  fontWeight: 700,
  fontSize: "1.2rem",
});

export const summary = style({
  textAlign: "right",
  marginTop: "2rem",
});

export const total = style({
  fontWeight: 700,
  fontSize: "1.2rem",
});

export const checkoutBtn = style({
  display: "inline-block",
  marginTop: ".5rem",
  padding: ".8rem 2.5rem",
  borderRadius: "6px",
  border: "none",
  fontWeight: 600,
  fontSize: "1rem",
  cursor: "pointer",
  color: "#fff",
  background: "#000",
});

export const formContainer = style({
  display: "flex",
  width: "100%",
  justifyContent: "center",
});

export const cartItems = style({
  width: "80%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

export const divider = style({
  width: "100%",
  height: "1px",
  background: "lightgray",
  margin: "2rem 0",
});
