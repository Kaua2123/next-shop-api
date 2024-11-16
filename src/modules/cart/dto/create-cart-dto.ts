export class CreateCartDto {
  id: string;
  created_at: string;
  user_id: number;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
}