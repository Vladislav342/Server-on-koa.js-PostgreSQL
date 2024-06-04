require('dotenv').config();
const Koa = require('koa');
const app = new Koa();
// const server = require('http').Server(app.callback());
const server = require('http').createServer(app.callback());
// const serve = require('koa-static');
const { koaBody } = require('koa-body');
const cors = require('@koa/cors');
// var cookie = require('koa-cookie');
const { default: cookie } = require('koa-cookie');
const dbSetup = require('./db/db-setup');
const session = require('koa-session');
const router = require('./router/usersRouter.js');

app.keys = ['some secret hurr'];

const CONFIG = {
  key: 'koa.sess',
  maxAge: 86400000,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false,
  secure: false,
  sameSite: null,
};

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  optionSuccessStatus: 200,
};

const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(session(CONFIG, app));

app.use(koaBody());
app.use(cookie());
app.use(router.routes());
app.use(router.allowedMethods());

dbSetup();

/*app.use(async (ctx, next) => {
    ctx.body = 'something went wrong ...';
});*/

server.listen(PORT, '127.0.0.1', () => {
  console.log(`server is ready on ${PORT} port`);
});
