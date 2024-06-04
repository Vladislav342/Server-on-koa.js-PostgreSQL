const UserRepository = require('./userRepository');
const bcrypt = require('bcrypt');
const tokenService = require('./tokenService');

class UserService {
  async registration(ctx) {
    //let { login, password } = ctx.request.body;
    const { login, password } = ctx.query;
    const candidate = await UserRepository.findOne(login);

    if (candidate[0]) {
      // throw new Error(`This user ${login} is already existed. Please, log in...`);
      return (ctx.body = JSON.stringify(
        {
          message: `This user ${login} is already existed. Please, log in...`,
        },
        null,
        2,
      ));
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const newUser = await UserRepository.createOne({
      login,
      password: hashPassword,
    });
    const tokens = tokenService.generateTokens({ ...newUser });

    await tokenService.saveToken(newUser.id, tokens.refreshToken);
    ctx.cookies.set('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    ctx.body = JSON.stringify(
      {
        ...tokens,
        user: newUser,
      },
      null,
      2,
    );
  }

  async logIn(ctx) {
    //const { login, password } = ctx.query;
    const { login, password } = ctx.request.body;
    const user = await UserRepository.findOne(login);
    if (!user.length) {
      /*return (ctx.body = JSON.stringify(
                {
                    message: `This user ${login} was not found...`,
                },
                null,
                2,
            ));*/
      throw new Error(`This user ${login} was not found...`);
    }

    const isPassEquals = await bcrypt.compare(password, user[0].password);
    if (!isPassEquals) {
      return (ctx.body = JSON.stringify(
        {
          message: `Your password is wrong...`,
        },
        null,
        2,
      ));
    }

    const tokens = tokenService.generateTokens({ ...user[0] });
    await tokenService.saveToken(user[0].id, tokens.refreshToken);

    ctx.cookies.set('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    ctx.body = JSON.stringify(
      {
        ...tokens,
        user,
      },
      null,
      2,
    );
  }

  async logOut(ctx) {
    try {
      const refreshToken = ctx.cookies.get('refreshToken');
      const removedToken = await tokenService.logOut(refreshToken);
      ctx.cookies.set('refreshToken', '');
      ctx.body = JSON.stringify(`${removedToken[0].id} is successfully removed!`, null, 2);
    } catch (e) {
      ctx.body = JSON.stringify(`You wasn't loged in yet`, null, 2);
    }
  }

  async refreshToken(ctx) {
    const refreshToken = ctx.cookies.get('refreshToken');
    const userData = await tokenService.refreshOneToken(refreshToken);

    if (!userData) {
      ctx.body = JSON.stringify(`You are Unauthorized`, null, 2);
      return ctx.body;
    }

    const user = await UserRepository.findOneById(userData[0].id);
    const tokens = tokenService.generateTokens({ ...user });
    await tokenService.saveToken(user.id, tokens.refreshToken);

    ctx.cookies.set('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    ctx.body = JSON.stringify(
      {
        ...tokens,
        user,
      },
      null,
      2,
    );
  }

  async getAllUsers(ctx) {
    const users = await UserRepository.findAll();
    ctx.body = JSON.stringify(users, null, 2);
  }

  async findUser(ctx) {
    const login = ctx.params.login;
    let user = await UserRepository.findOne(login);
    ctx.body = JSON.stringify(user, null, 2);
  }

  async getUserById(ctx) {
    const id = ctx.params.id;
    let user = await UserRepository.findOneById(id);
    ctx.body = JSON.stringify(user, null, 2);
  }

  async removeUserById(ctx) {
    const id = ctx.params.id;
    await UserRepository.deleteOne(id);
    await tokenService.removeToken(id);
    ctx.body = 'The User and Token were successfully removed';
  }
}

module.exports = new UserService();
