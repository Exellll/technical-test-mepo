import { Injectable } from "@nestjs/common";
import { ReservationsService } from "../services/reservations.service";
import { CreateReservationDto } from "../dtos";

@Injectable()
export class CreateReservationUseCase {
  constructor(
    private readonly reservationsService: ReservationsService,
  ) {}

  execute(dto: CreateReservationDto) {
    return this.reservationsService.create(dto);
  }
}
