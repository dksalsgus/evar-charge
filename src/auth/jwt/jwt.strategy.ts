import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../user/user.entity';
import { UserRepository } from '../../user/user.repository';
const fromAuthCookie = function () {
  return function (request) {
    let token = null;
    if (request && request.cookees) {
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
      jwtFromRequest: fromAuthCookie(), //ExtractJwt.fromAuthHeaderAsBearerToken(),
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
