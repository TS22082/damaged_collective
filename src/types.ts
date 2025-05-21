import { type JSXNode } from "@builder.io/qwik/jsx-runtime";
import type { IconProps } from "@qwikest/icons";

export type ProductCardPropsType = {
  product: StripeProductType;
  handleUiUpdate: any;
  handleDelete: any;
  handleUpdate: any;
};

export type StripMetadataType = {
  brand: string;
  img: string;
};

export type StripeProductType = {
  id: string;
  name: string;
  images: string[];
  metadata: StripMetadataType;
};

export type NavItemType = {
  label: string;
  path: string;
  icon: (props: IconProps) => JSXNode;
};

export type CartItem = { price_id: string; product_id: string; qty: number };

export type CartState = {
  items: CartItem[];
};
