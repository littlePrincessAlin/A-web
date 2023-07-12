const Router = require('koa-router');

const loginRouter = require('./login');

const router = new Router();

// 装载所有路由
router.use('/users', loginRouter.routes(), loginRouter.allowedMethods())

// 导出
module.exports = router
