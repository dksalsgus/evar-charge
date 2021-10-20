import { IsEmail, IsString, IsEnum } from 'class-validator';
import { EnRole } from '../user.entity';

export class UpdateUserDto {
  /**
   * 회원 비밀번호
   */
  @IsString()
  userPw: string;
  /**
   * 회원 이메일
   */
  @IsEmail()
  userEmail: string;

  /**
   * 회원 권한
   */
  @IsEnum(EnRole)
  userRole: EnRole;
}
