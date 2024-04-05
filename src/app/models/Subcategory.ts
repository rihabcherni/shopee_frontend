import { Product } from "./Product";

export interface Subcategory {
  id: number;
  category:number,
  category_name: string;
  name: string;
  description: string;
  image: string;
  products: Product[];
}
