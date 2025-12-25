import { Injectable } from "@nestjs/common";
import { StockMovementsService } from "../services/stock-movements.service";

@Injectable()
export class GetStockMovementsUseCase {
  constructor(
    private readonly stockMovementsService: StockMovementsService,
  ) {}

  execute() {
    return this.stockMovementsService.findAll();
  }
}
