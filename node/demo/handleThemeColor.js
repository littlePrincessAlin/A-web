const globby = require('globby');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const request = require('request');
const tar = require('tar');
const fse = require('fs-extra');
let errorFileLog = []; // log error

const apiHost = {
  dev: 'https://managedev.yueyuechuxing.cn',
  test: 'https://managetest.yueyuechuxing.cn',
  test2: 'https://managetest2.yueyuechuxing.cn',
  pre: 'https://manage-pre.yueyuechuxing.cn',
  public: 'https://manage.yueyuechuxing.cn'
};

// 获取各个租户json
const getScssFile = ({ tenantId = 1, rid = 1, terminal = 1 }) => new Promise((resolve, reject) => {
  // 请求接口
  axios({
    url: apiHost.test + '/private/v1/listColor',
    method: 'post',
    data: {
      tenantId,
      rid,
      terminal
    }
  }).then(res => {
    resolve(res.data.data);
  }).catch(err => {
    console.log('json获取失败', err);
  });
});

// 获取租户list
const getTenantList = () => new Promise((resolve, reject) => {
  let tenantIdData = [];
  axios({
    url: apiHost.test + '/private/v1/tenant/list',
    method: 'post'
  }).then(res => {
    (res.data.data || []).forEach(item => {
      tenantIdData.push(item.id);
    });
    // TODO：上线前删除
    tenantIdData = tenantIdData.slice(0, 698); // 模拟线上700个真实租户
    console.log('租户list', tenantIdData);
    // console.log('租户list长度', tenantIdData.length);
    resolve(tenantIdData || []);
  }).catch(err => {
    console.log('租户list获取失败', err);
  });
});

/**
 * 压缩文件
 * @param {string} dest
 * @param {string} clientType
 */
function tarFiles(dest, clientType) {
  if (!fse.pathExistsSync(dest)) {
    fse.mkdirpSync(dest);
  }
  const filepath = `${dest}/${clientType}.tar.gz`;
  // console.log('filepath--------',filepath)
  return tar.c(
    {
      file: filepath,
      cwd: dest,
      gzip: true,
      filter: fp => {
        return !fp.startsWith('.') && !/\.(json|md|gz)$/.test(fp);
      }
    },
    fse.readdirSync(dest)
  ).then(() => {
    return filepath;
  });
}

async function handleColor(startTime) {
  getTenantList().then(async res => {
    const tenantIdLength = res.length;
    const fileList = globby.sync('./dist/css/[^_]*.css');
    for (let i = 0; i < tenantIdLength; i++) {
      await getScssFile({
        tenantId: res[i],
        rid: 1,
        terminal: 1
      }).then(resScss => {
        const map = new Map();
        // 遍历css文件列表
        fileList.forEach(function(file) {
          fs.readFile(file, 'utf-8', function(err, dataStr) {
            let mkdirErr;
            let writeFileErr;
            // 如果存在‘var(’标识，才进行色值替换操作、文件写入
            if (dataStr.indexOf('var(') !== -1) {
              // 遍历色值json
              resScss.forEach(function(color) {
                const reg = new RegExp(`var\\(${color.code}\\)`, 'g');
                dataStr = dataStr.replace(reg, color.value);
              });
              // 创建文件目录
              if (!map.has(res[i])) {
                const fileDir = `./dist-theme/${res[i]}`;
                fs.mkdirSync(fileDir, { recursive: true }, function(err) {
                  if (err) {
                    mkdirErr = err;
                  }
                });
                map.set(res[i], fileDir); // 记录
              }
              // 创建/写入文件
              const filePath = path.parse(file);
              const writeFilePath
                = `./dist-theme/${res[i]}/${filePath.base}`;
              fs.writeFile(writeFilePath, dataStr, function(err) {
                if (err) {
                  writeFileErr = err;
                }
              });
            }
            if (mkdirErr || writeFileErr || err) {
              errorFileLog.push({
                mkdirErr,
                writeFileErr,
                readFileErr: err,
                tenantId: res[i],
                readFile: file
              });
            }
          });
        });
      });
    }
    // 压缩
    const themeFile = await tarFiles('dist-theme', 'dist-theme');
    // 上传
    // const stat = fs.statSync(themeFile);
    // const fileSize = stat.size; // 文件大小
    // const bufferSize = 1024 * 1024 * 1024; // 每次传输的字节数，或设置未为fileSize，让客户端尽可能长的获取字节数
    // let startPos = 0;
    // let endPos = startPos + bufferSize;
    request.post({
      url:
      'https://apitest.yueyuechuxing.cn/admin2/devops/cdn/h5/1?parentPath=h5-driver-dispose-css',
      formData: {
        file: fs.createReadStream(themeFile, {
          highWaterMark: 1024 * 1024
        })
      }
    }, (_err, response, body) => {
      const { code, msg } = JSON.parse(body) || {};
      if (code !== 1) {
        console.log('上传失败', msg);
      }
      // 删除文件夹
      fs.rmdirSync('./dist-theme', { recursive: true });
      const endTime = new Date().getTime() - startTime;
      console.log('打包花了多少s-------', endTime / 1000);
    });
    errorFileLog.length && console.log('errorFileLog', errorFileLog);
  });
}

class HandleThemeColor {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const startTime = new Date().getTime();
    console.log('开始------', startTime);
    compiler.plugin('done', function() {
      handleColor(startTime);
    });
  }
}

module.exports = HandleThemeColor;
