import { Subcategory } from "./Subcategory";

export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  subcategories: Subcategory[];
}
