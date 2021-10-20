import { IsEnum, IsNumber, IsString } from 'class-validator';
import { EnChargerStatus } from '../charger.entity';
export class UpdateChargerDto {
  /**
   * 충전소 주소
   */
  @IsString()
  addr: string;
  /**
   * 충전소 위도
   */
  @IsString()
  lat: string;
  /**
   * 충전소 경도
   */
  @IsString()
  lng: string;
  /**
   * 충전소 상태
   */
  @IsEnum(EnChargerStatus)
  status: EnChargerStatus;
}
