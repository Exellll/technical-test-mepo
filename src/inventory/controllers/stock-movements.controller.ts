import { Controller, Get } from "@nestjs/common";
import { GetStockMovementsUseCase } from "../usecases/get-stock-movements.usecase";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ApiResponseBuilder } from "src/common/response/api-response.util";

@ApiTags('Stock Movements')
@Controller('stock-movements')
export class StockMovementsController {
  constructor(
    private readonly getStockMovements: GetStockMovementsUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all stock movements'})
  @ApiResponse({ status: 200, description: 'Successfully retrieved stock movements'})
  @ApiResponse({ status: 404, description: 'Error retrieving stock movements'})
  async findAll() {
    const stockMovements = await this.getStockMovements.execute();
    return ApiResponseBuilder.success(
      stockMovements,
      'Success get stock movements'
    )
  }
}
