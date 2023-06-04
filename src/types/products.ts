export type Info = {
  title: string;
  description: string;
};

export type Variant = {
  'product-number': string;
  value: string;
  price: number;
  discount: number;
  available: boolean;
  images: {
    src: string;
  }[];
};

export type Option = {
  name: string;
  variants: Variant[];
};

export interface Product {
  id: number;
  category: string;
  type?: string;
  animal: string;
  'product-name': string;
  brand: string;
  meat?: string[];
  info: Info[];
  options: Option;
}

export interface CartProduct {
  'product-number': string;
  'product-name': string;
  image: string;
  price: number;
  discountedPrice?: number;
  variant: string;
  quantity: number;
}
