import { IsEnum, IsNumber, IsNumberString, IsString } from 'class-validator';
import { EnChargerStatus } from '../charger.entity';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateChargerDto {
  @ApiProperty({description:'충전소 주소'})
  @IsString()
  addr: string;
  @IsNumberString()
  @ApiProperty({description:'충전소 위도'})
  lat: string;
  @IsNumberString()
  @ApiProperty({description:'충전소 경도'})
  lng: string;
   @ApiProperty({description:'충전소 상태'})
   status: EnChargerStatus;
}
