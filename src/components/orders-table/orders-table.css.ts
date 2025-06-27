import { globalStyle, style } from "@vanilla-extract/css";

export const tableContainerStyles = style({
  textAlign: "left",
  borderCollapse: "collapse",
  borderRadius: "5px",
  width: "80%",
});

export const tableHeaderStyles = style({
  borderBottom: "1px solid #ccc",
  backgroundColor: "#f5f5f5",
});

export const cursorOnHover = style({
  ":hover": {
    cursor: "pointer",
  },
});

globalStyle(`${tableHeaderStyles} th`, {
  padding: "10px 5px",
  fontWeight: "bold",
});

export const tableContentRowStyles = style({
  textAlign: "left",
  borderBottom: "1px solid #ccc",
});

globalStyle(`${tableContentRowStyles} td`, {
  padding: "10px 5px",
});
