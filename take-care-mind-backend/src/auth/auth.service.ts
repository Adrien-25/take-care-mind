import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateGoogleUser(googleId: string, email: string): Promise<User> {
    let user = await this.userRepository.findOne({ where: { googleId } });
    Logger.log('Utilisateur trouvé : ' + JSON.stringify(user));

    if (!user) {
      Logger.log("Pas d'user");
      user = this.userRepository.create({ googleId, email });
      await this.userRepository.save(user);
    }
    return user;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }
    Logger.log('Mot de passe valide ?   ' + isPasswordValid);
    
    const { password: _, ...result } = user;
    Logger.log('Validation donné Login : ' + result);
    return result;
  }

  async signup(email: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('Un utilisateur avec cet email existe déjà');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
    });

    return this.userRepository.save(newUser);
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
