import { style } from "@vanilla-extract/css";

const orderContainerWidth = "60%";

export const orderContainer = style({
  width: "100%",
  margin: "20px 0",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
});

export const orderDetailsContainer = style({
  display: "flex",
  width: orderContainerWidth,
  flexDirection: "column",
  justifyContent: "center",
});

export const orderDetailHeader = style({
  marginBottom: "10px",
});

export const contactAndShippingContainer = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});

export const orderItemTable = style({
  marginTop: "20px",
  borderCollapse: "collapse",
  borderRadius: "5px",
});

export const tableHeaderStyle = style({
  textAlign: "left",
  borderBottom: "1px solid #ccc",
  backgroundColor: "#f5f5f5",
});

export const tableRowStyle = style({
  textAlign: "left",
  borderBottom: "1px solid #ccc",
});

export const headerTextStyle = style({
  padding: "10px 5px",
  fontWeight: "bold",
});

export const itemTextStyle = style({
  padding: "10px 5px",
});
