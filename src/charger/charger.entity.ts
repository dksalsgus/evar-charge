import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

export enum EnChargerStatus {
  통신이상 = 1,
  충전대기 = 2,
  충전중 = 3,
  운영중지 = 4,
  점검중 = 5,
  상태미확인 = 9,
}

@Entity()
export class Charger {
  /**
   * 충전기 ID
   */
  @PrimaryGeneratedColumn({ type: 'bigint' })
  chargerId: number;
  /**
   * 충전소 ID
   */
  @PrimaryColumn({ type: 'bigint' })
  stationId: number;

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
  @Column({
    type: 'enum',
    enum: EnChargerStatus,
    default: EnChargerStatus.충전대기,
  })
  status: EnChargerStatus;
}
