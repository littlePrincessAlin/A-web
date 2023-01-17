const axios = require('axios');
const fs = require('fs');
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
    str += `  ${item.code}: ${item.value}; \n`
  });
  str = ':root { \n' + str + '}';
   fs.writeFile('./scss文件.css', str, function(err) {
      if (err) {
        writeFileErr = err;
      }
    });
})
