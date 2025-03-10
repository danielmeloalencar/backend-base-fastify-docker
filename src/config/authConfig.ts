export const authConfig = {
  jwt: {
    secret: process.env.JWT_SECRET || 'default_secret_key_change_in_production',
    expiresIn: '1d',
  },
  passwordSaltRounds: 10,
};
