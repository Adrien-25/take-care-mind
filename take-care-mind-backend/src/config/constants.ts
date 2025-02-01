export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'VOTRE_CLE_SECRETE_PAR_DEFAUT',
  expiresIn: process.env.JWT_EXPIRES_IN || '60m',
};
