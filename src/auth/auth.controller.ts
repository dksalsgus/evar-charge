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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({summary:'로그인'})
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() authLoginDto: AuthLoginDto,
  ): Promise<string> {
    const token = await this.authService.login(authLoginDto);
    await response.cookie('Authorization', token);
    return token;
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({summary:'JWT Guard',})
  @Get()
  async Auth(@Req() req: Request) {
    console.log(req.user);
    return req.user;
  }
}
