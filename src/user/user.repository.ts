import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/req-create-user.dto';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new User();
    newUser.userId = createUserDto.userId;
    newUser.userPw = await this.hashPw(createUserDto.userPw);
    newUser.userEmail = createUserDto.userEmail;
    // newUser.userRole = createUserDto.userRole;

    const joinUser = await this.create(newUser);
    const user = this.save(joinUser);
    return user;
  }

  async hashPw(userPw: string): Promise<string> {
    const hashedPw = await bcrypt.hash(userPw, 10);
    return hashedPw;
  }
}
