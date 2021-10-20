import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Charger {
  /**
   * 충전소 ID
   */
  @PrimaryGeneratedColumn({ type: 'bigint' })
  stationId: number;
  /**
   * 충전기 ID
   */
  @PrimaryColumn({ type: 'bigint' })
  chargerId: number;
  /**
   * 충전소 주소
   */
  @Column({ type: 'nvarchar' })
  addr: string;
  /**
   * 충전소 위도
   */
  @Column({ type: 'varchar' })
  lat: string;
  /**
   * 충전소 경도
   */
  @Column({ type: 'varchar' })
  lng: string;
  /**
   * 충전소 상태
   */
  @Column({ type: 'int' })
  status: number;
}
