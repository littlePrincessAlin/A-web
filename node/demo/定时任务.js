const fs = require('fs');
const crypto = require('crypto') // node 内置
const cmd = require("child_process").exec;


const STORAGE_FILE_NAME = "./storageData.json";

const defaultMobile = "13552024212"; // 默认
const noticeMobile = '18810806443'; // 通知


// public
 const Webhook = 'https://oapi.dingtalk.com/robot/send?access_token=d0cf3cb73c820fafb6e37b32bd169102a9759501e9c626e3fc72df3817683a9e'
 const SECRET = 'SECba7c3f8ac2a09d40448b04af7a4aba2bf3c35ae9c34626d377bad5b68c904c22'

// test
// const Webhook = 'https://oapi.dingtalk.com/robot/send?access_token=b77283884038cd291335c9b1d3c17ba90a705f48e039c8e1732432530cf5e79c'
// const SECRET = 'SECf20d4fd768f0058ec9ebeb70591b050e19e91d8c547524f3ae6c09c7d51162bd' // 加签

const nameList = [
  {
    "name": "韩坤峰",
    "mobile": "13552024212"
  },
  {
    "name": "李琳",
    "mobile": "15565609894"
  },
  {
    "name": "齐建伟",
    "mobile": "13120000175"
  },
  {
    "name": "周学昊",
    "mobile": "18733629466"
  },
  {
    "name": "韩慧鹏",
    "mobile": "18845573607"
  },
  {
    "name": "张腾",
    "mobile": "13785521928"
  }
]

// 检测是否是节假日
async function checkIsHoliday(time) {
  return new Promise((resovle, reject) => {
    console.log('time__________', time);
    cmd(`curl 'http://timor.tech/api/holiday/info/${time}' \
        -H 'Connection: keep-alive' \
        -H 'Cache-Control: max-age=0' \
        -H 'Upgrade-Insecure-Requests: 1' \
        -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4535.3 Safari/537.36' \
        -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' \
        -H 'Accept-Language: zh-CN,zh;q=0.9' \
        --compressed \
        --insecure`, (r1, r2) => {
      console.log(r2)
      if (r1) {
        reject(null);
        return;
      }
      let data = {};
      if (r2 && typeof r2 === 'string') {
        data = JSON.parse(r2);
      }
      resovle(data.holiday?.holiday || [6, 7].includes(data.type.week));
    })
    // cmd(`curl 'http://www.autmone.com/openapi/icalendar/queryDate?date=${time}' \
    //     -H 'Connection: keep-alive' \
    //     -H 'Cache-Control: max-age=0' \
    //     -H 'Upgrade-Insecure-Requests: 1' \
    //     -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4535.3 Safari/537.36' \
    //     -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' \
    //     -H 'Accept-Language: zh-CN,zh;q=0.9' \
    //     --compressed \
    //     --insecure`, (r1, r2) => {
    //   console.log(r2)
    //   if (r1) {
    //     reject(null);
    //     return;
    //   }
    //   let data = {};
    //   if (r2 && typeof r2 === 'string') {
    //     data = JSON.parse(r2).data;
    //   }
    //   resovle(data.isHoliday || ["六", "日"].includes(data.week));
    // })
  })
}

function newCheckIsHoliday(time) {
  return new Promise((resolve) => {
    cmd(`curl 'https://wx.aviclt.com:8443/HolidayAPI/api?date=${time}&uuid=a35111d1-02f4-11eb-837b-00163e126fa5' \
        -H 'Connection: keep-alive' \
        -H 'uuid: a35111d1-02f4-11eb-837b-00163e126fa5' \
        -H 'Cache-Control: max-age=0' \
        -H 'sec-ch-ua: "Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"' \
        -H 'sec-ch-ua-mobile: ?0' \
        -H 'Upgrade-Insecure-Requests: 1' \
        -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4535.3 Safari/537.36' \
        -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' \
        -H 'Sec-Fetch-Site: none' \
        -H 'Sec-Fetch-Mode: navigate' \
        -H 'Sec-Fetch-User: ?1' \
        -H 'Sec-Fetch-Dest: document' \
        -H 'Accept-Language: zh-CN,zh;q=0.9' \
        --compressed`, async (err, response) => {
      if (response && typeof response === 'string') {
        response = JSON.parse(response);
      }
      console.log(`newCheckIsHoliday ==========>`, response);
      const { result, status } = response || {};
      if (status === 'ok' && result) {
        resolve(result.ifHoliday);
      } else {
        console.log(`新接口请求失败，使用旧的兜底`);
        resolve(await checkIsHoliday(time));
      }
    })
  })
}

function formData(data, type) {
  var _data = data;
  if (String(data).length == 13) {
    _data = data
  } else {
    _data = data * 1000
  }
  const time = new Date(_data);
  const Y = time.getFullYear();
  const Mon = time.getMonth() + 1;
  const Day = time.getDate();
  const H = time.getHours();
  const Min = time.getMinutes();
  const S = time.getSeconds();
  if (type == "Y") {
    return `${Y}-${Mon}-${Day}`
  } else if (type == "H") {
    return `${H}:${Min}:${S}`
  } else {
    return `${Y}-${Mon}-${Day} ${H}:${Min}:${S}`
  }
}

function dingTalk(mobile) {
  const atMobiles = nameList.map((item) => {
    return item.mobile;
  })

  // console.log('atMobiles',atMobiles)
  
  const timestamp = Date.now()

  const str = timestamp + "\n" + SECRET
  const sign = crypto.createHmac('sha256', SECRET).update(str).digest('base64')
  const signEncodeUrl = encodeURIComponent(sign)
  console.log('signEncodeUrl', signEncodeUrl)

  cmd(`curl '${Webhook}&timestamp=${timestamp}&sign=${signEncodeUrl}' \
    -H 'Content-Type: application/json' \
    -d '{
      "msgtype":"markdown",
      "markdown":{
          "title":"日报小提醒",
          "text":"
          \n> #### **今日幸运鹅**
          \n> #### **日 期**：'${ formData(new Date().getTime(), "Y") }'
          \n> #### **负责人**：@'${ mobile }'
          "
      },
      "at": {
        "atMobiles": [
          "13552024212",
          "15565609894",
          "13120000175",
          "18733629466",
          "18845573607",
          "13785521928"
        ],
        "isAtAll": false
       }
 }'`)
}

function getFileDataSync(file) {
  const fileContent = fs.readFileSync(file);
  return fileContent.toString() ? JSON.parse(fileContent.toString()) : '';
}

function updateFileDataSync(file, data) {
  fs.writeFileSync(file, JSON.stringify(data));
}

function waitFn(time) {
  return new Promise((resovle) => {
    setTimeout(resovle, time || 0);
  })
}

async function main() {
  let isHoliday = false;
  const isFriday = new Date().getDay()
  try {
    const time = formData(new Date().getTime(), 'Y');
    isHoliday = await newCheckIsHoliday(time);
  } catch (error) {
    console.log(`checkIsHoliday ==========>${error}`)
  }
  console.log(`是否节假日 =============> ${isHoliday}`);
  if (isHoliday) {
    return;
  }
  console.log(`是否是周五 =============> ${isFriday}`);
   if(isFriday == '5') {
    return
   }

  // 检测是否有缓存文件
  if (!fs.existsSync("./storageData.json")) {
    cmd("touch storageData.json");
    await waitFn(1000);
    console.log('‘无缓存数据问题，创建完毕');
  }

  const { mobile } = getFileDataSync(STORAGE_FILE_NAME) || {};
  const defaultIndex = nameList.findIndex((item) => item.mobile === defaultMobile) || 0;
  console.log('last mobile ====>', mobile);
  let txzz = '';
  if (!mobile) {
    txzz = nameList[defaultIndex];
  } else {
    let index = nameList.findIndex((item) => item.mobile === mobile);
    if (index < 0) { index = defaultIndex };
    if (index === nameList.length - 1) {
      index = 0;
    } else {
      ++index;
    }
    console.log(`index =======>${index}`);
    txzz = nameList[index];
  }

  updateFileDataSync(STORAGE_FILE_NAME, txzz);

  dingTalk(txzz.mobile)
}

main()
