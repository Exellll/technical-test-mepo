export enum StockMovementType {
  RESERVATION = 'RESERVATION',
  CANCELLATION = 'CANCELLATION',
  STOCK_OUT = 'STOCK_OUT',
}

export class StockMovementDto {
  id: string;
  itemId: string;
  quantity: number;
  type: StockMovementType;
  createdAt: Date;
}
