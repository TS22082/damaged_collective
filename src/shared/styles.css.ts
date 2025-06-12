import { style } from "@vanilla-extract/css";

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

export const btnPressed = style({
  scale: "0.9",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
});

export const shaddowed = style({
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
});

export const btnHover = style({
  ":hover": {
    scale: "0.99",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
});

export const btn = style({
  padding: "5px 10px",
  borderRadius: "5px",
  border: "none",
  color: "#fff",
  cursor: "pointer",
  transition: "0.25s",
});

export const mainContainer = style({
  minHeight: "40vh",
});
