// http服务

const { APP_PORT } = require('./src/config/config.default')

const app = require('./app')

app.listen(APP_PORT, () => {
    console.log(`服务运行成功：${APP_PORT}`)
})
