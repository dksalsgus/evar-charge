import { IsEnum, IsNumber, IsString } from 'class-validator';
import { EnChargerStatus } from '../charger.entity';

export class CreateChargerDto {
  /**
   * 충전소 ID
   */
  stationId: number;
  /**
   * 충전소 주소
   */
  addr: string;
  /**
   * 충전소 위도
   */
  lat: string;
  /**
   * 충전소 경도
   */
  lng: string;
  /**
   * 충전소 상태
   */
  status: EnChargerStatus;
}
