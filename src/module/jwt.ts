import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

interface jwtPayload {
  socialId: string;
}

const jwtSign = async (user: jwtPayload) => {
  const signOption: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: JWT_EXPIRES_IN,
    issuer: 'kyrics',
  };

  const accessToken = jwt.sign(user, JWT_SECRET, signOption);
  return accessToken;
};

const jwtVerify = async (token: string): Promise<jwt.JwtPayload | string | number> => {
  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    if (error.message === 'jwt expired') {
      return TOKEN_EXPIRED;
    }
    return TOKEN_INVALID;
  }
  return decoded;
};

export { jwtPayload, jwtSign, jwtVerify };
