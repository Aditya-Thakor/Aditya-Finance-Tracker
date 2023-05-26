export interface TransactionInterface {
  transactionId?: number;
  transactionDate: Date | string;
  transactionMY: string;
  transactionAmount: number;
  transactionNote: string;
  transactionTo: string;
  transactionFrom: string;
  transactionType: string;
  transactionReceipt: ArrayBuffer | string | null | FileList;
}
