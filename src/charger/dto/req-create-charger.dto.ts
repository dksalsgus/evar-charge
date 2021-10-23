import { IsEnum, IsNumber, IsNumberString, IsString } from 'class-validator';
import { EnChargerStatus } from '../charger.entity';

export class CreateChargerDto {
  /**
   * 충전소 ID
   */
  @IsNumber()
  stationId: number;
  /**
   * 충전소 주소
   */
  @IsString()
  addr: string;
  /**
   * 충전소 위도
   */
  @IsNumberString()
  lat: string;
  /**
   * 충전소 경도
   */
  @IsNumberString()
  lng: string;
  /**
   * 충전소 상태
   */
  status: EnChargerStatus;
}
