import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '../../config/constants';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.NEXTAUTH_SECRET,
    });
  }

  async validate(payload: any) {
    try {
      const user = await this.userService.findById(payload.sub);

      if (!user) {
        throw new UnauthorizedException('Utilisateur non trouvé');
      }
      return { userId: payload.sub, email: payload.email };
    } catch (error) {
      throw new UnauthorizedException('Token invalide');
    }
  }
}
