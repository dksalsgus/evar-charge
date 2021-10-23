import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/req-create-user.dto';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /**
   * 회원 가입
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // 회원객체 생성
    const newUser = new User();
    newUser.userId = createUserDto.userId;
    newUser.userPw = await this.hashPw(createUserDto.userPw);
    newUser.userEmail = createUserDto.userEmail;
    // newUser.userRole = createUserDto.userRole;

    // 회원 entity 생성
    const joinUser = await this.create(newUser);
    // 생성한 entity 저장
    const user = this.save(joinUser);
    return user;
  }

  /**
   * 비밀번호 암호화
   * @param userPw 회원 PW
   * @returns
   */
  async hashPw(userPw: string): Promise<string> {
    const hashedPw = await bcrypt.hash(userPw, 10);
    return hashedPw;
  }
}
