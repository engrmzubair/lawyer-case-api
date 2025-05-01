import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { AppError, ErrorType } from '../utils/error';
import { SignupInput, SigninInput, AuthData } from 'src/types/auth';
import { JwtUtils } from 'src/utils/jwt';
import { env } from 'src/config/env';

export class AuthService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  static async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  static async hashPassword(password: string): Promise<string> {
    const saltRounds = env.bcryptSaltRounds;
    return bcrypt.hash(password, saltRounds);
  }

  public async signup(data: SignupInput): Promise<AuthData> {
    const { name, email, password } = data;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new AppError(ErrorType.BadRequest, 'Email is already registered');
    }

    const hashedPassword = await AuthService.hashPassword(password);

    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = JwtUtils.sign({ userId: newUser.id, email: newUser.email });

    return { user: { id: newUser.id, name: newUser.name, email: newUser.email }, token };
  }

  public async signin(data: SigninInput): Promise<AuthData> {
    const { email, password } = data;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError(ErrorType.Unauthorized, 'Invalid email or password');
    }

    const passwordMatch = await AuthService.comparePassword(password, user.password);

    if (!passwordMatch) {
      throw new AppError(ErrorType.Unauthorized, 'Invalid email or password');
    }

    const token = JwtUtils.sign({ userId: user.id, email: user.email });

    return { user: { id: user.id, name: user.name, email: user.email }, token };
  }
}

export default AuthService;
