import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpStatus,
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
    // console.log(user);
    const token = await this.authService.generateJwtToken(user);

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
    // Logger.log('SIGNUP CONTROLLER : ');

    try {
      const user = await this.authService.signup(email, password);
      // Logger.log('UTILISATEUR CRÉÉ : ' + JSON.stringify(user));
      // return user;
      return { statusCode: HttpStatus.CREATED };
      // return { statusCode: HttpStatus.CREATED, user };
    } catch (error) {
      // Logger.log('ERREUR LORS DU SIGNUP : ' + JSON.stringify(error));
      throw error;
    }
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() _req) {
    // La redirection est gérée par Passport
  }
}
