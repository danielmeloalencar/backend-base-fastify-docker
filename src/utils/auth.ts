import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Secret, SignOptions } from 'jsonwebtoken';
import { authConfig } from '../config/authConfig';

export async function hashPassword(password: string): Promise<string> {
  return bcryptjs.hash(password, authConfig.passwordSaltRounds);
}

export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
  return bcryptjs.compare(password, hashedPassword);
}

export function generateToken(payload: object): string {
  // Definindo explicitamente os tipos para evitar confusão nas sobrecargas
  const secret: Secret = authConfig.jwt.secret;
  // Usando uma asserção de tipo para expiresIn
  const options: SignOptions = {
    expiresIn: authConfig.jwt.expiresIn as jwt.SignOptions['expiresIn'],
  };

  return jwt.sign(payload, secret, options);
}

export function verifyToken(token: string): any {
  try {
    const secret: Secret = authConfig.jwt.secret;
    return jwt.verify(token, secret);
  } catch (error) {
    console.log({ error });
    throw new Error('Token inválido');
  }
}
