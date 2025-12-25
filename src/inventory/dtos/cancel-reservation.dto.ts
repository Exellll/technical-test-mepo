import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CancelReservationDto {
  @ApiProperty()
  @IsUUID()
  reservationId: string;
}
