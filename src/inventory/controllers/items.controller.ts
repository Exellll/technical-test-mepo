import { Controller, Get } from "@nestjs/common";
import { GetItemsUseCase } from "../usecases/get-items.usecase";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ApiResponseBuilder } from "src/common/response/api-response.util";

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(
    private readonly getItems: GetItemsUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Retreive all inventory items'})
  @ApiResponse({ status: 200, description: 'Successfully retrieved items'})
  async findAll() {
    const items = await this.getItems.execute();
    return ApiResponseBuilder.success(
      items,
      'Success get items'
    )
  }
}
