const Router = require('koa-router');
const router = new Router();

const UserService = require('../service/userService.js');
const TokenService = require('../service/tokenService.js');

const { validationSchemaForId, validationSchemaForObject } = require('./validSchema');
const validationMiddleware = require('./validationMiddleware');
const authMiddleware = require('./authMiddleware');

router.post(
  '/api/auth/new_user',
  validationMiddleware('request.query', validationSchemaForObject),
  UserService.registration,
);

router.post('/api/login', UserService.logIn);
router.get('/api/all/tokens', TokenService.allTokens);
router.get('/api/all/users', authMiddleware(), UserService.getAllUsers);

router.get(
  '/api/user/:id',
  validationMiddleware('id', validationSchemaForId),
  UserService.getUserById,
);

router.delete(`/api/logout`, UserService.logOut);
router.delete('/api/removeUser/:id', UserService.removeUserById);
router.get('/api/refresh', UserService.refreshToken);

module.exports = router;
