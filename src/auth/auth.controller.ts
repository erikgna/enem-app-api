import {
  Controller,
  Req,
  UseGuards,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: any) {
    return this.authService.login(req.user).catch(() => {
      throw new HttpException(
        'Não foi possível realizar o login.',
        HttpStatus.BAD_REQUEST,
      );
    });
  }
}
