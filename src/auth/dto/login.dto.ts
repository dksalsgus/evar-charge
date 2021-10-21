import { IsString } from 'class-validator';

export class AuthLoginDto {
  /**
   * User Id
   */
  @IsString()
  userId: string;
  /**
   * User Pw
   */
  @IsString()
  userPw: string;
}
