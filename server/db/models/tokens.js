const { Model } = require('objection');

class Tokens extends Model {
  static get tableName() {
    return 'tokens';
  }
}

module.exports = Tokens;
