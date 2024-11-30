export type BillingType = 'PIX' | 'CREDIT_CARD' | 'BOLETO';
export type Status =
  | 'PENDING'
  | 'RECEIVED'
  | 'CONFIRMED'
  | 'OVERDUE'
  | 'REFUNDED'
  | 'RECEIVED_IN_CASH'
  | 'REFUND_REQUESTED'
  | 'REFUND_IN_PROGRESS'
  | 'CHARGEBACK_REQUESTED'
  | 'CHARGEBACK_DISPUTE'
  | 'AWAITING_CHARGEBACK_REVERSAL'
  | 'DUNNING_REQUESTED'
  | 'DUNNING_RECEIVED'
  | 'AWAITING_RISK_ANALYSIS';

export interface ICustomer {
  id: string;
  dateCreated: string;
  name: string;
  email: string;
  cpfCnpj: string;
  postalCode: string;
  addressNumber: string;
}

export interface IPayment {
  id: string;
  dateCreated: string;
  customer: string;
  value: string;
  description?: string;
  billingType: BillingType;
  status: Status;
  installmentCount?: number; // numero de parcelas.
  installmentValue?: number;
}

export interface IToken {
  id: number;
  role: 'CLIENT' | 'ADMIN';
}

export interface ProductInCart {
  id: string;
  created_at: Date;
  price: number;
  quantity: number;
  productId: string;
  cartId: string;
}
