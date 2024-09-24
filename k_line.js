/*
如果有结果就执行以下代码
*/
var body = $response.body; //令body为响应体
/*
中间这里填想要修改的数据
*/
//var cc = '{  "hasAuthorization" : false }'

body = body.replace(/hasAuthorization\":\w+/g,'hasAuthorization":true');

console.log(body);
$done(body); //结束
