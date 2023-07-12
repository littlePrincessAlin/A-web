// 用户名密码登陆
const loginController = (ctx, next)=>{
  ctx.body = '用户名密码登陆';
  next();
}

// 二维码登陆
const loginQrController = (ctx, next)=>{
  ctx.body = '二维码登陆';
  next();
}

module.exports = {
  loginController,
  loginQrController
}
