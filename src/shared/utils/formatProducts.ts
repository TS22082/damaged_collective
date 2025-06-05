import { type StripMetadataType } from "../types";

export const formatProducts = (products: any, pricesMap: any) => {
  return products.map((product: any) => {
    return {
      id: product.id as string,
      name: product.name as string,
      description: product.description as string,
      images: product.images as string[],
      price: pricesMap.get(product.default_price as string),
      default_price: product.default_price as string,
      metadata: product.metadata as StripMetadataType,
    };
  });
};
