const jwt = require('jsonwebtoken');
const TokenRepository = require('./tokenRepository');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, `${process.env.JWT_ACCESS_SECRET}`, {
      expiresIn: '10s',
    });
    const refreshToken = jwt.sign(payload, `${process.env.JWT_REFRESH_SECRET}`, {
      expiresIn: '30d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(id, refreshToken) {
    const tokenData = await TokenRepository.findOne(id);
    if (tokenData) {
      return await TokenRepository.updateToken(id, refreshToken);
    }

    return await TokenRepository.saveNewToken(id, refreshToken);
  }

  async removeToken(id) {
    const tokenData = await TokenRepository.findOneByToken(id);
    if (tokenData) {
      return await TokenRepository.removeOneToken(id);
    }

    return true;
  }

  async allTokens(ctx) {
    const tokens = await TokenRepository.findAllTokens();
    ctx.body = JSON.stringify(tokens, null, 2);
  }

  async logOut(refreshToken) {
    const removedToken = await TokenRepository.removeTokenByToken(refreshToken);
    return removedToken;
  }

  async refreshOneToken(refreshToken) {
    if (!refreshToken) {
      return false; // UnauthorizedError
    }

    const userData = this.validateRefreshToken(refreshToken);
    const token = await TokenRepository.findOneByToken(refreshToken);
    if (!userData || !token) {
      return false; // UnauthorizedError
    }

    return token;
  }
}

module.exports = new TokenService();
