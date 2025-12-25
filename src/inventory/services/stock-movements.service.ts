import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { StockMovementDto, StockMovementType } from "../dtos";
import { Reservation } from "../entities/reservation.entity";
import { StockOut } from "../entities/stock-out.entity";
import { ReservationStatus } from "../enums/reservation-status.enum";

@Injectable()
export class StockMovementsService {
  constructor(private readonly dataSource: DataSource) {}

  async findAll(): Promise<StockMovementDto[]> {
    const reservationRepo = this.dataSource.getRepository(Reservation);
    const stockOutRepo = this.dataSource.getRepository(StockOut);

    const reservations = await reservationRepo.find({
      relations: ['item'],
    });

    const stockOuts = await stockOutRepo.find({
      relations: ['item'],
    });

    const movements: StockMovementDto[] = [
      ...reservations.map((r) => ({
        id: r.id,
        itemId: r.item.id,
        quantity: r.quantity,
        type:
          r.status === ReservationStatus.CANCELLED
            ? StockMovementType.CANCELLATION
            : StockMovementType.RESERVATION,
        createdAt: r.createdAt,
      })),
      ...stockOuts.map((s) => ({
        id: s.id,
        itemId: s.item.id,
        quantity: s.quantity,
        type: StockMovementType.STOCK_OUT,
        createdAt: s.createdAt,
      })),
    ];

    return movements.sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
    );
  }
}
