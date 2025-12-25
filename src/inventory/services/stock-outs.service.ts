import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { DataSource } from "typeorm";
import { CreateStockOutDto } from "../dtos";
import { StockOut } from "../entities/stock-out.entity";
import { Item } from "../entities/item.entity";

@Injectable()
export class StockOutsService {
  constructor(private readonly dataSource: DataSource) {}

  async create(dto: CreateStockOutDto): Promise<StockOut> {
    return this.dataSource.transaction(async (manager) => {
      const item = await manager.findOne(Item, {
        where: { id: dto.itemId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!item) {
        throw new NotFoundException('Item not found');
      }

      if (item.availableStock < dto.quantity) {
        throw new ConflictException('Insufficient available stock');
      }

      item.availableStock -= dto.quantity;
      item.totalStock -= dto.quantity;

      await manager.save(item);

      const stockOut = manager.create(StockOut, {
        item,
        quantity: dto.quantity,
        reason: dto.reason,
      });

      return manager.save(stockOut);
    });
  }
}
