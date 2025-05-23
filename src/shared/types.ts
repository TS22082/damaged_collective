import { type JSXNode } from "@builder.io/qwik/jsx-runtime";
import type { IconProps } from "@qwikest/icons";

export type ProductCardPropsType = {
  product: StripeProductType;
  priceMap: Map<string, StripePriceType>;
};

export type StripMetadataType = {
  brand: string;
  img: string;
};

export type StripeProductType = {
  id: string;
  name: string;
  description: string;
  images: string[];
  default_price: string;
  metadata: StripMetadataType;
};

export type NavItemType = {
  label: string;
  path: string;
  icon: (props: IconProps) => JSXNode;
  items?: boolean;
};

export type CartItem = { price_id: string; product_id: string; qty: number };

export type CartState = {
  items: CartItem[];
};

export type StripePriceType = {
  id: string;
  product: string;
  currency: string;
  unit_amount: number;
};
