import { Body, Controller, Param, Post } from "@nestjs/common";
import { CreateReservationUseCase } from "../usecases/create-reservation.usecase";
import { CancelReservationUseCase } from "../usecases/cancel-reservation.usecase";
import { CreateReservationDto } from "../dtos";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly createReservation: CreateReservationUseCase,
    private readonly cancelReservation: CancelReservationUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new reservations'})
  @ApiResponse({ status: 201, description: 'Reservation successfully created'})
  @ApiResponse({ status: 400, description: 'Invalid reservation data'})
  create(@Body() dto: CreateReservationDto) {
    return this.createReservation.execute(dto);
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Cancel reservation'})
  @ApiResponse({ status: 201, description: 'Reservation successfully canceled'})
  @ApiResponse({ status: 400, description: 'Invalid reservation ID / Data'})
  cancel(@Param('id') id: string) {
    return this.cancelReservation.execute({
      reservationId: id,
    });
  }
}
