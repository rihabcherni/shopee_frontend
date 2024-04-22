export interface Seller {
  id: number;
  is_verified: boolean;
  email: string;
  phone_number: string | null;
  first_name: string;
  last_name: string;
  photo: string | null;
  address: string | null;
  date_of_birth: string | null;
}
