import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * 로그인 정보로 유효성 검사
   * @param authLoginDto 로그인 정보 id pw
   * @returns Auth Member
   */
  async validateMember(authLoginDto: AuthLoginDto): Promise<User> {
    const { userId, userPw } = authLoginDto;
    const user = await this.userService.findUserByUserId(userId);

    if (!(await bcrypt.compare(userPw, user.userPw))) {
      throw new UnauthorizedException();
    }
    return user;
  }

  /**
   * 유효성 검사후 JWT sign
   * @param authLoginDto 로그인 정보
   * @returns Access Token
   */
  async login(authLoginDto: AuthLoginDto): Promise<string> {
    const user = await this.validateMember(authLoginDto);

    const payload = {
      userId: user.userId,
    };
    const access_token = await this.jwtService.sign(payload);

    return access_token;
  }
}
