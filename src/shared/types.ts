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

export type AddressType = {
  city: string;
  country: string;
  line1: string;
  line2: null | string;
  postal_code: string;
  state: string;
};

export type OrderStatusType = "open" | "shipped" | "delivered" | "cancelled";

export type OrderSummaryType = {
  _id: string;
  eventId: string;
  sessionId: string;
  name: string;
  status: OrderStatusType;
  address: AddressType;
  itemsCount: number;
  total: string;
};

export type ShippingType = {
  address: AddressType;
  carrier: string | null;
  name: string;
  phone: string | null;
  tracking_number: string | null;
};

export type OrderRawType = {
  _id: string;
  eventId: string;
  sessionId: string;
  shipping: ShippingType;
  status: OrderStatusType;
  email: string;
  itemsCount: number;
  total: number;
};
