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

  @Post('user')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userService.createUser(createUserDto);
    return user;
  }

  @Get('user/:userId')
  async findUserByUserId(@Param('userId') userId: string): Promise<User> {
    const user = await this.userService.findUserByUserId(userId);
    return user;
  }

  @Get('users')
  async findAllUser(): Promise<User[]> {
    const users = await this.userService.findAllUser();
    return users;
  }

  @Patch('user/:userNo')
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('userNo') userNo: number,
  ): Promise<User> {
    const user = await this.userService.updateUser(updateUserDto, userNo);
    return user;
  }

  @Delete('user/:userNo')
  async deleteUser(@Param('userNo') userNo: number): Promise<void> {
    const user = await this.userService.deleteUser(userNo);
    return null;
  }
}
