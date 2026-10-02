import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    const usertoken = await this.authService.validateUser(data);

    if (!usertoken) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return usertoken;
  }
}