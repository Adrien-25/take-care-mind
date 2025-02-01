import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateGoogleUser(googleId: string, email: string): Promise<User> {
    let user = await this.userRepository.findOne({ where: { googleId } });
    Logger.log('utilisateur : ' + user);
    Logger.log('Utilisateur trouvé : ' + JSON.stringify(user));

    if (!user ) {
      Logger.log("Pas d'user");

      user = this.userRepository.create({ googleId, email });
      await this.userRepository.save(user);
    }
    return user;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id }; // Utilisez user.id pour le payload
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async generateJwtToken(user: any): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
