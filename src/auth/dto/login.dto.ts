import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class AuthLoginDto {
  @IsString()
  @ApiProperty({description:'유저 ID'})
  userId: string;
  
  @IsString()
  @ApiProperty({description:'유저 PW'})
  userPw: string;
}
