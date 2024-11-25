export class CreateCartDto {
  id: string;
  subtotal: number;
  created_at: string;
  user_id: number;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
}
