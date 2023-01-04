// 自定义webpack插件：h5换肤
const globby = require('globby');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const request = require('request');
const tar = require('tar');
const fse = require('fs-extra');
let errorFileLog = []; // log error

const getScssFile = ({ tenantId = 1, rid = 1, terminal = 1 }) => new Promise((resolve, reject) => {
  // 请求接口
  axios.get(
    'https://delivery.yueyuechuxing.cn/h5/ajx_bundle_driver_resource/saas/color/color_index.json'
  )
    .then(res => {
      resolve(res.data);
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
  // 1、需要接口获取以下三个list
  // 租户id枚举
  const tenantIdData = [1,
    800000,
    800001,
    800002,
    800003,
    800004,
    800005,
    800006,
    800007,
    800008,
    800009,
    8000010,
    8000011,
    8000012,
    8000013,
    8000014,
    8000015,
    8000016,
    8000017
  ];
  const tenantIdLength = tenantIdData.length;

  const fileList = globby.sync('./dist/css/[^_]*.css');
  for (let i = 0; i < tenantIdLength; i++) {
    await getScssFile({
      tenantId: tenantIdData[i],
      rid: 1,
      terminal: 1
    }).then(res => {
      const map = new Map();
      // 遍历css文件列表
      fileList.forEach(function(file) {
        fs.readFile(file, 'utf-8', function(err, dataStr) {
          let mkdirErr;
          let writeFileErr;
          if (dataStr) {
            // 遍历色值json
            res.forEach(function(color) {
              const reg = new RegExp(`var\\(--${color.name}\\)`, 'g');
              dataStr = dataStr.replace(reg, color.value);
            });
            // 创建文件目录
            if (!map.has(tenantIdData[i])) {
              const fileDir = `./dist-theme/${tenantIdData[i]}`;
              fs.mkdirSync(fileDir, { recursive: true }, function(err) {
                if (err) {
                  mkdirErr = err;
                }
              });
              map.set(tenantIdData[i], fileDir); // 记录
            }
            // 创建/写入文件
            const filePath = path.parse(file);
            const writeFilePath
              = `./dist-theme/${tenantIdData[i]}/${filePath.base}`;
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
              tenantId: tenantIdData[i],
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
  request.post({
    url: 'https://apitest.yueyuechuxing.cn/admin2/devops/cdn/h5/1?parentPath=h5-driver-dispose-css',
    formData: {
      file: fs.createReadStream(themeFile)
    }
  }, (_err, response, body) => {
    // console.log('body', JSON.parse(body));
    const { code, msg, data } = JSON.parse(body) || {};
    if (code !== 1) {
      console.log('上传失败', msg);
    }
    // 删除文件夹
    fs.rmdirSync('./dist-theme', { recursive: true });
  });
  const endTime = new Date().getTime() - startTime;
  console.log('打包花了多少s-------', endTime / 1000);
  errorFileLog.length && console.log('errorFileLog', errorFileLog);
}

class HandleThemeColor {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const startTime = new Date().getTime();
    console.log('开始------', new Date().getTime());
    compiler.plugin('done', function() {
      handleColor(startTime);
    });
  }
}

module.exports = HandleThemeColor;
