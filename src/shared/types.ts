export type ProductCardPropsType = {
  product: StripeProductType;
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
  price: StripePriceType;
  default_price: string;
  metadata: StripMetadataType;
};

export type NavItemType = {
  label: string;
  path: string;
  items?: boolean;
};

export type CartItem = {
  price_id: string;
  product_id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  qty: number;
};

export type CartState = {
  items: CartItem[];
};

export type UserType = {
  email: string;
  name: string;
  image: string;
};

export type StripePriceType = {
  id: string;
  product: string;
  currency: string;
  unit_amount: number;
};

export type ItemType = {
  price_id: string;
  qty: number;
};
