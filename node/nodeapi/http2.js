const http = require('http');
http.createServer((req, res) => {
  console.log('req', req);
  // 设置响应头： 状态码200， 文件类型html， 字符集utf-8
  res.writeHead(200, {
    "Content-type": "text/html; charset=utf-8",
  })
  res.write('hello, lilin 你好');
  res.end(); // 结束响应
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');
