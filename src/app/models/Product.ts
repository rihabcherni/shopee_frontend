
export interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  discount: string;
  quantity: number;
  total_ratings: number;
  total_reviews: number;
  category_name: string;
  subcategory_name: string;
  seller_name: string;
  variants: Variant[];
  reviews: Review[];
  images: Images[];
  description: string;
  created_at: string;
  updated_at: string;
  subcategory: number;
  seller: number;
}

export interface Variant {
  id: number;
  color: string;
  size: string;
  stock: number;
  product: number;
}
export interface Images {
  id: number;
  image: string;
  product: number;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  createAt: string;
  product: number;
  user: number;
  user_name: string;
  user_image: string;
}
