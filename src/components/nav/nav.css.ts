import { style } from "styled-vanilla-extract/qwik";

export const navContainer = style({
  display: "flex",
  flexDirection: "row",
  height: "50vh",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#000",
  color: "#fff",
  padding: "0 20px",
  position: "relative",
});

export const linkSection = style({
  position: "absolute",
  display: "flex",
  top: "10%",
  right: "20px",
  flexDirection: "row",
  alignItems: "center",
  gap: "20px",
});

export const titleLink = style({
  color: "#fff",
  textDecoration: "none",
  fontSize: "2rem",
});

export const navLink = style({
  color: "#fff",
  textDecoration: "none",
});
