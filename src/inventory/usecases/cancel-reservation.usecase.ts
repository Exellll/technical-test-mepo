import { Injectable } from "@nestjs/common";
import { ReservationsService } from "../services/reservations.service";
import { CancelReservationDto } from "../dtos";

@Injectable()
export class CancelReservationUseCase {
  constructor(
    private readonly reservationsService: ReservationsService,
  ) {}

  execute(dto: CancelReservationDto) {
    return this.reservationsService.cancel(dto);
  }
}
