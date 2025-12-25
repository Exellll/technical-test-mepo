import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CancelReservationDto, CreateReservationDto } from '../dtos';
import { Reservation } from '../entities/reservation.entity';
import { Item } from '../entities/item.entity';
import { ReservationStatus } from '../enums/reservation-status.enum';

const logger = new Logger();

@Injectable()
export class ReservationsService {
  constructor(private readonly dataSource: DataSource) {}

  async create(dto: CreateReservationDto): Promise<Reservation> {
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
      await manager.save(item);

      const reservation = manager.create(Reservation, {
        item,
        quantity: dto.quantity,
        status: ReservationStatus.ACTIVE,
      });

      return manager.save(reservation);
    });
  }

  async cancel(dto: CancelReservationDto): Promise<Reservation> {
    return this.dataSource.transaction(async (manager) => {
      const reservation = await manager.findOne(Reservation, {
        where: { id: dto.reservationId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!reservation) {
        throw new NotFoundException('Reservation not found');
      }

      if (reservation.status !== ReservationStatus.ACTIVE) {
        throw new ConflictException('Reservation already cancelled');
      }

      const item = await manager.findOne(Item, {
        where: { id: reservation?.itemId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!item) {
        throw new NotFoundException('Item not found');
      }
      
      item.availableStock += reservation.quantity;
      reservation.status = ReservationStatus.CANCELLED;

      await manager.save(item);
      return manager.save(reservation);
    });
  }
}
