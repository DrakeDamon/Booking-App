import jwt, { JwtPayload } from 'jsonwebtoken';

export function getJWTSecretKey(): string {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret || secret.length === 0) {
    throw new Error('JWT secret key is not defined');
  }
  return secret;
}

export async function verifyAuth(token: string): Promise<JwtPayload | null> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, getJWTSecretKey(), (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded as JwtPayload);
    });
  });
}