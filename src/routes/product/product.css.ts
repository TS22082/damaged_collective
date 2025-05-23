import { style } from "@vanilla-extract/css";

export const productPageContainer = style({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});

export const productContainer = style({
  marginTop: "50px",
  width: "80%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
});

export const productImage = style({
  width: "300px",
  height: "700px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
});

export const productInfo = style({
  width: "300px",
});
