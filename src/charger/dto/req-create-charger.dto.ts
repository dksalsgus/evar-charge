import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsNumberString, IsString } from 'class-validator';
import { EnChargerStatus } from '../charger.entity';

export class CreateChargerDto {
  @IsNumber()
  @ApiProperty({description:'충전소 ID'})
  stationId: number;
  @IsString()
  @ApiProperty({description:'충전소 주소'})
  addr: string;
  @IsNumberString()
  @ApiProperty({description:'충전소 경도'})
  lat: string;
  @IsNumberString()
  @ApiProperty({description:'충전소 위도'})
  lng: string;
   @ApiProperty({description:'충전소 상태'})
   status: EnChargerStatus;
}
