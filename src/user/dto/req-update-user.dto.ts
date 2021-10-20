import { IsEmail, IsString } from 'class-validator';

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
}
