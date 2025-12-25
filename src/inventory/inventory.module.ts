import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Item } from "./entities/item.entity";
import { Reservation } from "./entities/reservation.entity";
import { StockOut } from "./entities/stock-out.entity";
import { ItemsController } from "./controllers/items.controller";
import { ReservationsController } from "./controllers/reservation.controller";
import { StockOutsController } from "./controllers/stock-outs.controller";
import { ItemsService } from "./services/items.service";
import { ReservationsService } from "./services/reservations.service";
import { StockOutsService } from "./services/stock-outs.service";
import { CreateReservationUseCase } from "./usecases/create-reservation.usecase";
import { CancelReservationUseCase } from "./usecases/cancel-reservation.usecase";
import { StockOutUseCase } from "./usecases/stock-out.usecase";
import { StockMovementsService } from "./services/stock-movements.service";
import { GetItemsUseCase } from "./usecases/get-items.usecase";
import { GetStockMovementsUseCase } from "./usecases/get-stock-movements.usecase";
import { StockMovementsController } from "./controllers/stock-movements.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Item, Reservation, StockOut])],
  controllers: [
    ItemsController,
    ReservationsController,
    StockOutsController,
    StockMovementsController,
  ],
  providers: [
    ItemsService,
    ReservationsService,
    StockOutsService,
    StockMovementsService,

    GetItemsUseCase,
    CreateReservationUseCase,
    CancelReservationUseCase,
    StockOutUseCase,
    GetStockMovementsUseCase,
  ],
})
export class InventoryModule {}
