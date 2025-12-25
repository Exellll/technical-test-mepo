import { Body, Controller, Post } from "@nestjs/common";
import { StockOutUseCase } from "../usecases/stock-out.usecase";
import { CreateStockOutDto } from "../dtos";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Stock Outs')
@Controller('stock-outs')
export class StockOutsController {
  constructor(
    private readonly createStockOut: StockOutUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new stock out'})
  @ApiResponse({ status: 201, description: 'Stock out successfully created'})
  @ApiResponse({ status: 400, description: 'Invalid stock out data'})
  create(@Body() dto: CreateStockOutDto) {
    return this.createStockOut.execute(dto);
  }
}
