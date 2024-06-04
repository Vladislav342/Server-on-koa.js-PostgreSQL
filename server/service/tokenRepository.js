const Tokens = require('../db/models/tokens');

class TokensRepository {
  async findAllTokens() {
    return Tokens.query();
  }

  async findOne(id) {
    return Tokens.query().findById(id);
  }

  async findOneByToken(refreshToken) {
    return Tokens.query().where('refreshToken', refreshToken);
  }

  async saveNewToken(id, refreshToken) {
    return Tokens.query()
      .insert({
        id,
        refreshToken,
      })
      .returning('id');
  }

  async updateToken(id, refreshToken) {
    return Tokens.query().findById(id).update({
      id,
      refreshToken,
    });
  }

  async removeOneToken(id) {
    return Tokens.query().findById(id).del();
    }

  async removeTokenByToken(token) {
    return Tokens.query().where('refreshToken', token).del().returning('id');
  }
}

module.exports = new TokensRepository();
