import { type JSXNode } from "@builder.io/qwik/jsx-runtime";
import type { IconProps } from "@qwikest/icons";

export type BoardType = {
  _id: string;
  brand: string;
  img: string;
};

export type ProductCardPropsType = {
  product: {
    _id: string;
    brand: string;
    img: string;
  };
  handleUiUpdate: any;
  handleDelete: any;
  handleUpdate: any;
};

export type StripeProductType = {
  id: string;
  name: string;
  images: string[];
  metadata: {
    brand: string;
    img: string;
  };
};

export type NavItemType = {
  label: string;
  path: string;
  icon: (props: IconProps) => JSXNode;
};
