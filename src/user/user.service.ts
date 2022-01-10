import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { CreateUserDto } from './dto/req-create-user.dto';
import { getConnection } from 'typeorm';
import { UpdateUserDto } from './dto/req-update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.createUser(createUserDto);
    return user;
  }

  async findUserByUserId(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ userId });
    if (!user) {
      throw new NotFoundException(`Not Found UserId =${userId}`);
    }
    return user;
  }
  async findUserByUserNo(userNo: number): Promise<User> {
    const user = await this.userRepository.findOne({ userNo });
    if (!user) {
      throw new NotFoundException(`Not Found UserId =${userNo}`);
    }
    return user;
  }

  async findAllUser(): Promise<User[]> {
    const users = await this.userRepository.find({});
    return users;
  }

  async updateUser(
    updateUserDto: UpdateUserDto,
    userNo: number,
  ): Promise<User> {
    const qr = getConnection().createQueryRunner();
    try {
      qr.startTransaction();
      const findUser = await this.findUserByUserNo(userNo);
      findUser.userPw = await this.userRepository.hashPw(updateUserDto.userPw);
      findUser.userEmail = updateUserDto.userEmail;
      // findUser.userRole = updateUserDto.userRole;

      const updateUser = this.userRepository.save(findUser);
      qr.commitTransaction();
      return updateUser;
    } catch (error) {
      qr.rollbackTransaction();
    } finally {
      qr.release();
    }
  }

  async deleteUser(userNo: number): Promise<void> {
    const user = await this.userRepository.delete({ userNo });
    return null;
  }
}
