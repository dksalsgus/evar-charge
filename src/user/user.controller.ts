import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/req-create-user.dto';
import { UpdateUserDto } from './dto/req-update-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 회원가입
   * @param createUserDto 회원가입 DTO
   * @returns 가입한 회원
   */
  @Post('user')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userService.createUser(createUserDto);
    return user;
  }

  /**
   * UserId로 회원 찾기
   * @param userId 회원 ID
   * @returns 찾은 회원
   */
  @Get('user/:userId')
  async findUserByUserId(@Param('userId') userId: string): Promise<User> {
    const user = await this.userService.findUserByUserId(userId);
    return user;
  }

  /**
   * 모든 회원 찾기
   * @returns 모든 회원
   */
  @Get('users')
  async findAllUser(): Promise<User[]> {
    const users = await this.userService.findAllUser();
    return users;
  }

  /**
   * 회원 수정
   * @param updateUserDto 회원수정 DTO
   * @param userNo 회원번호
   * @returns 수정된 회원
   */
  @Patch('user/:userNo')
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('userNo') userNo: number,
  ): Promise<User> {
    const user = await this.userService.updateUser(updateUserDto, userNo);
    return user;
  }

  /**
   *
   * @param userNo 회원번호
   * @returns
   */
  @Delete('user/:userNo')
  async deleteUser(@Param('userNo') userNo: number): Promise<void> {
    const user = await this.userService.deleteUser(userNo);
    return null;
  }
}
