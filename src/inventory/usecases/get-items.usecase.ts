import { Injectable } from "@nestjs/common";
import { ItemsService } from "../services/items.service";

@Injectable()
export class GetItemsUseCase {
  constructor(private readonly itemsService: ItemsService) {}

  execute() {
    return this.itemsService.findAll();
  }
}
