import { Injectable } from "@nestjs/common";
import { StockOutsService } from "../services/stock-outs.service";
import { CreateStockOutDto } from "../dtos";

@Injectable()
export class StockOutUseCase {
  constructor(
    private readonly stockOutsService: StockOutsService,
  ) {}

  execute(dto: CreateStockOutDto) {
    return this.stockOutsService.create(dto);
  }
}
