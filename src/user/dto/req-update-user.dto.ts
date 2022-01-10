import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsEnum } from 'class-validator';
import { EnRole } from '../user.entity';

export class UpdateUserDto {
  @IsString()
  @ApiProperty({description:'회원 비밀번호'})
  userPw: string;
  @IsEmail()
  @ApiProperty({description:'회원 이메일'})
  userEmail: string;

  // @IsEnum(EnRole)
  // @ApiProperty({description:'회원 권한'})
  // userRole: EnRole;
}
