import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../user/user.entity';
import { UserRepository } from '../../user/user.repository';
/**
 * 쿠키에 저장된 jwt 가져오기
 * @returns 토큰
 */
const fromAuthCookie = function () {
  return function (request) {
    let token = null;
    if (request && request.cookies) {
      token = request.cookies['Authorization'];
    }
    return token;
  };
};
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: fromAuthCookie(), // 쿠키에 에서 가져온 jwt 체크 //ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any): Promise<User> {
    const { userId } = payload;
    const user = await this.userRepository.findOne({ userId: userId });
    return user;
  }
}
