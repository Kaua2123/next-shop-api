export type BillingType = 'BOLETO' | 'CREDIT_CARD' | 'PIX';

export class CreatePaymentDto {
  customer: string; // id do customer
  billingType: BillingType;
  value: number;
  dueDate: string;
  description?: string;
}
