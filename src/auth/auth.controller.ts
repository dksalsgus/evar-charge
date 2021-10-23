import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Res,
  Req,
} from '@nestjs/common';
import { AuthLoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 로그인
   * @param response 응답
   * @param authLoginDto Login DTO
   * @returns jwt
   */
  @Post('login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() authLoginDto: AuthLoginDto,
  ): Promise<string> {
    const token = await this.authService.login(authLoginDto);
    await response.cookie('Authorization', token);
    return token;
  }

  /**
   * 로그인 체크
   * @param req
   * @returns user 정보
   */
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async Auth(@Req() req: Request) {
    console.log(req.user);
    return req.user;
  }
}
