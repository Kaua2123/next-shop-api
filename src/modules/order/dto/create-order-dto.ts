export class CreateOrderDto {
  userId: number;

  isInstallment?: boolean;
  installmentCount?: number;
}
