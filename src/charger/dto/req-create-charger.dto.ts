import { IsNumber, IsString } from 'class-validator';

export class CreateChargerDto {
  /**
   * 충전기 ID
   */
  @IsNumber()
  chargerId: number;
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
  status: number;
}
