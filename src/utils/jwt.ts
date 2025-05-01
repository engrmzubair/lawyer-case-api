import jwt, { SignOptions} from 'jsonwebtoken';
import { env } from '../config/env';

interface JwtPayload {
  userId: number;
  email: string;
}

export class JwtUtils {
  private static secretKey = env.jwtSecret;
  private static expiresIn= env.jwtExpiration;

  static sign(payload: JwtPayload): string {
    const options: SignOptions = {
      expiresIn: this.expiresIn,
    };
    return jwt.sign(payload, this.secretKey, options);
  }

  static verify(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, this.secretKey) as JwtPayload;
    } catch {
      return null;
    }
  }

  static decode(token: string): JwtPayload | null {
    return jwt.decode(token) as JwtPayload | null;
  }
}
