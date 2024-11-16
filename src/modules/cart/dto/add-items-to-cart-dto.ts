export class AddItemsToCartDto {
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
}
