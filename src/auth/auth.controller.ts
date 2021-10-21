import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { AuthLoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { AuthUser } from './user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto): Promise<string> {
    return await this.authService.login(authLoginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async Test(@AuthUser() user: any) {
    return user;
  }

  @Get('login')
  LoginPage() {}
}
