// 导入koa模块
const Koa = require('koa');
const bodyParser = require('koa-bodyparser')
// 创建koa的实例app
const app = new Koa();
const fs = require("fs");
const path = require("path");
const { koaBody } = require("koa-body");
const { format } = require("date-fns");
const router = require('koa-router')();

// app.use(async ctx => {
//     ctx.body = "Hello World 111"
// })

app.use(bodyParser()); // 解析post 参数
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}));
// POST@/upload
router.post(
  "/upload",
  async (ctx) => {
    try {
      // 获取上传文件
      const files = ctx.request.files;
      console.log('files', files)
      // 正则 替换掉文件原始路径中不需要的部分
      // const reg = new RegExp(".*/upload/", "g");
      // for (const fileKey in files) {
      //   ctx.uploadpaths = ctx.uploadpaths ? ctx.uploadpaths : [];
      //   console.log('files-path', files[fileKey].path)
      //   ctx.uploadpaths.push({
      //     name: files[fileKey].name,
      //     url: files[fileKey].path.replace(reg, ""),
      //   });
      // }
      ctx.body = { code: 200, msg: "我上传了一个zip", data:{ uploadpaths: files }};
    } catch (error) {
      ctx.status = 400;
      ctx.body = { code: 400, msg: "上传失败", data: {} };
    }
  }
);
app.use(router.routes()).use(router.allowedMethods())
// 监听端口
app.listen(3000, () => {
    console.log("服务器已启动，http://localhost:3000");
})
