import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Redirect,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}

  @Post('google/callback')
  async googleCallback(@Body() body: { googleId: string; email: string }) {
    const { googleId, email } = body;
    const user = await this.authService.validateGoogleUser(googleId, email);
    const token = await this.authService.generateJwtToken(user);
    return { token };
  }

  // @Post('google/callback')
  // // @UseGuards(AuthGuard('google'))
  // @Redirect()
  // async googleAuthRedirect(@Request() req) {
  //   try {
  //     const { id, emails } = req.user;
  //     const email = emails[0].value;
  //     const user = await this.authService.validateGoogleUser(id, email);
  //     const token = await this.authService.generateJwtToken(user);
  //     return { url: `http://localhost:3000/dashboard?token=${token}` };
  //   } catch (error) {
  //     this.logger.error('Google authentication failed', error.stack);
  //     return {
  //       url: 'http://localhost:3000/auth/error?message=AuthenticationFailed',
  //     };
  //   }
  // }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() _req) {
    // La redirection est gérée par Passport
  }
}
