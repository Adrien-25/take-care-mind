import {
  Body,
  ConflictException,
  Controller,
  Get,
  Logger,
  Post,
  Redirect,
  Req,
  Request,
  UnauthorizedException,
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

  @Post('login')
  async login(@Body() body) {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const token = await this.authService.generateJwtToken(user);
    // return { token };

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      token,
    };
  }

  @Post('signup')
  async signup(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    try {
      const user = await this.authService.signup(email, password);
      return { message: 'Utilisateur créé avec succès', user };
    } catch (error) {
      if (error.code === '23505') {
        // Code PostgreSQL pour violation d'unicité
        throw new ConflictException(
          'Un utilisateur avec cet email existe déjà',
        );
      }
      throw error;
    }
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
