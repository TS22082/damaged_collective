import { style } from "styled-vanilla-extract/qwik";

export const container = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});

export const newFormContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "40%",
});

export const formLabel = style({
  marginTop: "15px",
  marginBottom: "5px",
  fontSize: "1.2rem",
  fontWeight: "bold",
});

export const formInput = style({
  borderRadius: "5px",
  border: ".5px solid #ccc",
  padding: "5px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
});

export const formSubmitBtn = style({
  marginTop: "15px",
  padding: "5px 10px",
  borderRadius: "5px",
  border: "none",
  color: "#fff",
  cursor: "pointer",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
  transition: "0.25s",
});

export const formBtnsContainer = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});

export const nameAndPriceContainer = style({
  display: "grid",
  gridTemplateColumns: "3fr 1fr",
  gap: "10px",
});
