import { style } from "@vanilla-extract/css";

export const imageContainer = style({
  height: "500px",
  backgroundSize: "fill",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  overflow: "hidden",
  display: "flex",
  justifyContent: "space-between",
});

export const cardContainer = style({
  width: "25%",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
  cursor: "pointer",
  padding: "0px",
  margin: "0px",
  border: "none",
  backgroundColor: "transparent",
  "@media": {
    "screen and (max-width: 768px)": {
      width: "40%",
    },
    "screen and (max-width: 480px)": {
      width: "300px",
    },
  },
});
