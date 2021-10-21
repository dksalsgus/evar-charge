import { IsEmail, IsEnum, IsString } from 'class-validator';
import { EnRole } from '../user.entity';

export class CreateUserDto {
  /**
   * 회원 아이디
   */
  @IsString()
  userId: string;
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

  // /**
  //  * 회원 권한
  //  */
  // @IsEnum(EnRole)
  // userRole: EnRole;
}
