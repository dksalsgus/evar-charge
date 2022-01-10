import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { EnRole } from '../user.entity';

export class CreateUserDto {
  @IsString()
  @ApiProperty({description:'회원 아이디'})
  userId: string;
  @IsString()
  @ApiProperty({description:'회원 비밀번호'})
  userPw: string;
  @IsEmail()
  @ApiProperty({description:'회원 이메일'})
  userEmail: string;

  // @IsEnum(EnRole)
  // userRole: EnRole;
}
