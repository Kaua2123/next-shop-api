export class CreateOrderDto {
  userId: number;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  isInstallment?: boolean;
  installmentCount?: number;
}
