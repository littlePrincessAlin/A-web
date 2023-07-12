// 应用入口

const Koa = require('koa')
const { koaBody } = require('koa-body');
const router = require('./src/router/index')
const app = new Koa()

// 在注册路由前注册
app.use(koaBody())
// 使用路由，必须是一个函数 // app.use(router.routes())
app.use(router.routes()).use(router.allowedMethods())

module.exports = app
