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
  border: "1px solid #ccc",
  padding: "10px",
  fontSize: "1.2rem",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
});

export const formSubmitBtn = style({
  marginTop: "15px",
  padding: "10px 20px",
  borderRadius: "5px",
  border: "none",
  color: "#fff",
  fontSize: "1.2rem",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
});

export const formBtnsContainer = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});

export const btnGreen = style({
  background:
    "linear-gradient(45deg, rgba(73, 155, 234, 1) 0%, rgba(26, 188, 156, 1) 100%)",
  filter:
    "progid:DXImageTransform.Microsoft.gradient( startColorstr='#499bea', endColorstr='#1abc9c', GradientType=1 )",
});

export const btnOrange = style({
  background:
    "linear-gradient(45deg, rgba(255, 193, 7, 1) 0%, rgba(255, 87, 34, 1) 100%)",
  filter:
    "progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffc107', endColorstr='#ff5722', GradientType=1 )",
});

export const btnPink = style({
  background:
    "linear-gradient(45deg, rgba(231, 72, 234, 1) 0%, rgba(75, 26, 188, 1) 100%)",
  filter:
    "progid:DXImageTransform.Microsoft.gradient( startColorstr='#e748ea', endColorstr='#4b1abc', GradientType=1 )",
});

export const nameAndPriceContainer = style({
  display: "grid",
  gridTemplateColumns: "75% 25%",
  gap: "10px",
});
