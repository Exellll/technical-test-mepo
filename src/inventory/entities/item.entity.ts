import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Reservation } from './reservation.entity';
import { StockOut } from './stock-out.entity';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'int' })
  totalStock: number;

  @Column({ type: 'int' })
  availableStock: number;

  @OneToMany(() => Reservation, (reservation) => reservation.item)
  reservations: Reservation[];

  @OneToMany(() => StockOut, (stockOut) => stockOut.item)
  stockOuts: StockOut[];
}
