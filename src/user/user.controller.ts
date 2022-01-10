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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('User API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({summary:'회원가입'})
  @Post('user')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userService.createUser(createUserDto);
    return user;
  }

  @ApiOperation({summary:'회원 찾기'})
  @Get('user/:userId')
  async findUserByUserId(@Param('userId') userId: string): Promise<User> {
    const user = await this.userService.findUserByUserId(userId);
    return user;
  }

  @ApiOperation({summary:'회원 모두 찾기'})
  @Get('users')
  async findAllUser(): Promise<User[]> {
    const users = await this.userService.findAllUser();
    return users;
  }

   @ApiOperation({summary:'회원 수정'})
   @Patch('user/:userNo')
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('userNo') userNo: number,
  ): Promise<User> {
    const user = await this.userService.updateUser(updateUserDto, userNo);
    return user;
  }

   @ApiOperation({summary:'회원 삭제'})
   @Delete('user/:userNo')
  async deleteUser(@Param('userNo') userNo: number): Promise<void> {
    const user = await this.userService.deleteUser(userNo);
    return null;
  }
}
