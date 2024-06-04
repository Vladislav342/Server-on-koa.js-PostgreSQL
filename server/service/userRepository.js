const Users = require('../db/models/users');

class UsersRepository {
  async findAll() {
    return Users.query();
  }

  async findOne(login) {
    return Users.query().where('login', login);
  }

  async findOneById(id) {
    return Users.query().findById(id);
  }

  async createOne({ id, login, password }) {
    return Users.query()
      .insert({
        id,
        login,
        password,
      })
      .returning('id');
  }

  async deleteOne(id) {
    return Users.query().findById(id).del();
  }

  async updateOne(id, obj) {
    return Users.query().findById(id).update(obj);
  }
}

module.exports = new UsersRepository();
