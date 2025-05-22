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
  top: "20px",
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

export const iconBtnBase = style({
  height: "40px",
  width: "40px",
  borderRadius: "20px",
  cursor: "pointer",
  color: "#fff",
  border: "none",
  transition: "0.25s",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
});

export const navLink = style({
  textDecoration: "none",
  color: "#fff",
});
