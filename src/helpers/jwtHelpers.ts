import jwt, { Secret } from 'jsonwebtoken';

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
) => {
  return jwt.sign(payload, secret, { expiresIn: expireTime });
};

export const JwtToken = {
  createToken,
};
