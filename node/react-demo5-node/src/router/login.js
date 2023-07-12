// 登陆注册相关 {prefix:'/users'}
const Router = require('koa-router');
const { login } = require('../controller/index');

const loginRouter = new Router(
  {prefix:'/login'}
);

// 会和 /users拼接
loginRouter.get('/', login.loginController)

module.exports = loginRouter;
