const axios = require('axios');
const fs = require('fs');
const request = require('request');
const tar = require('tar');
const fse = require('fs-extra');
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
getScssFile({
  tenantId: 1,
  rid: 1,
  terminal: 1
}).then(resScss => {
  console.log('resScss', resScss)
  let str = '';
  resScss.forEach(item => {
    str += `"${item.code}": "${item.value}", \n`
  });
   fs.writeFile('./scss文件.css', str, function(err) {
      if (err) {
        writeFileErr = err;
      }
    });
})

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

function uploadH5 (tenantId, filepath, destPath, isPublic = '') {
  const testApi = `https://apitest.yueyuechuxing.cn/admin2/devops/cdn/h5/1?parentPath=${destPath}`
  const publicApi = `https://apitest.yueyuechuxing.cn/api/upload`
  log.info(`HOST:${isPublic ? publicApi : testApi}`);
  log.info(`parentPath:${destPath}`);
  log.info(`文件路径:${filepath}`);
  return new Promise((resolve, reject) => {
    request.post({
      url: isPublic ? publicApi : testApi,
      formData: {
        flatform: destPath,
        file: fs.createReadStream(filepath)
      }
    }, (err, response, body) => {
      log.info(`statusCode:${response.statusCode}`);
      log.info(`body:${body}`);
      if (!err && response.statusCode == 200) {
        const data = JSON.parse(body);
        if (data.code === 1) {
          resolve(data.data)
        } else {
          reject(data.msg);
        }
      } else {
        reject(err || '我tm自爆🔪🔪🔪，网络错误！！！')
      }
    })
  })
}

// request.post({
//   url: 'https://apitest.yueyuechuxing.cn/admin2/devops/cdn/h5/1?parentPath=h5saas/color',
//   formData: {
//     flatform: 'h5saas/color',
//     file: fs.createReadStream('color.css'),
//   }
// }, (err, response, body) => {
//   if (!err && response.statusCode == 200) {
//     const data = JSON.parse(body);
//     if (data.code === 1) {
//       console.log('data', data)
//     } else {
//       console.log(data.msg);
//     }
//   } else {
//     console.log(err || '我tm自爆🔪🔪🔪，网络错误！！！')
//   }
// })

// request.post({
//     url:
//     'https://apitest.yueyuechuxing.cn/admin2/devops/cdn/h5/1?parentPath=h5-driver-dispose-css',
//     formData: {
//       file: fs.createReadStream('color.css', {
//         highWaterMark: 1024 * 1024
//       })
//     }
// }, (_err, response, body) => {
//   console.log('上传', body)
//   const { code, msg } = JSON.parse(body) || {};
//     if (code !== 1) {
//       console.log('上传失败', msg);
//     }
//   });
