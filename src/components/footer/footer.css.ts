import { style } from "@vanilla-extract/css";

export const footerBase = style({
  marginTop: "50px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  height: "auto",
  backgroundColor: "#000",
  color: "#fff",
});

export const footerContent = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-around",
  width: "100%",
});

export const section = style({
  margin: "15px",
  width: "300px",
  textAlign: "center",
});

export const socialIcons = style({
  marginTop: "10px",
  display: "inline-flex",
  gap: "10px",
});
