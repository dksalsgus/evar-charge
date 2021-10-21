import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Response,
  Request,
} from '@nestjs/common';
import { AuthLoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Response({ passthrough: true }) res,
    @Body() authLoginDto: AuthLoginDto,
  ): Promise<string> {
    const token = await this.authService.login(authLoginDto);
    await res.cookie('Authorization', token);
    return token;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async Auth(@Request() req: any) {
    return req.user;
  }

  @Get('login')
  LoginPage() {}
}
