export interface ClientWithdrawalDto {
  identifier: string;
  clientName: string;
  clientType: string;
  totalWithdrawalAmount: number;
}

export interface ClientTransactionCountDto {
  identifier: string;
  clientName: string;
  clientType: string;
  transactionCount: number;
}

export interface MovementRequest {
  documentNumber: string;
  cityName: string;
  amount: number;
  accountNumber: number;
}

