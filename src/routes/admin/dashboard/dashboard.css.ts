import { style } from "@vanilla-extract/css";

export const dashBoardContainer = style({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "20px",
  alignItems: "center",
});

export const dashboardItemTile = style({
  width: "300px",
  height: "200px",
  display: "flex",
  borderRadius: "10px",
  backgroundColor: "#000",
  color: "#fff",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
  ":hover": {
    backgroundColor: "lightgray",
  },
});

export const dashboardHeader = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  margin: "40px 0",
});
