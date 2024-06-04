const tokenService = require('../service/tokenService');

const authMiddleware = () => {
  return async (ctx, next) => {
    try {
      const authorizationHeader = ctx.header.authorization;
      if (!authorizationHeader) {
        throw new Error(`You are unauthorized`);
      }

      const accessToken = authorizationHeader.split(' ')[1];
      if (!accessToken) {
        throw new Error(`You are unauthorized`);
      }

      const userData = tokenService.validateAccessToken(accessToken);
      if (!userData) {
        throw new Error(`You are unauthorized`);
      }

      await next();
    } catch (e) {
      throw new Error(`You are unauthorized`);
    }
  };
};

module.exports = authMiddleware;
