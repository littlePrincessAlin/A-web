const fs = require('fs');
const axios = require('axios');
const apiHost = {
  dev: 'https://managedev.yueyuechuxing.cn',
  test: 'https://managetest.yueyuechuxing.cn',
  test2: 'https://managetest2.yueyuechuxing.cn',
  pre: 'https://manage-pre.yueyuechuxing.cn',
  public: 'https://manage.yueyuechuxing.cn'
};
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
    tenantIdData = tenantIdData.slice(0, 702); // 模拟线上700个真实租户
    console.log('租户list', tenantIdData);
    // console.log('租户list长度', tenantIdData.length);
    resolve(tenantIdData || []);
  }).catch(err => {
    console.log('租户list获取失败', err);
  });
});
getTenantList().then(res => {
  fs.writeFile('test.txt', res.toString(), err => {});
})
