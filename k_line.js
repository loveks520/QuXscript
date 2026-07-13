/*
如果有结果就执行以下代码
*/
var body = $response.body; // 令 body 為響應體

// 修改授權相關欄位
body = body.replace(/"isPerpetual"\s*:\s*false/g, '"isPerpetual": true');
body = body.replace(/"expiredTime"\s*:\s*\d+/g, '"expiredTime": 2524579200000');
body = body.replace(/"unactivatedAuthDays"\s*:\s*\d+/g, '"unactivatedAuthDays": 999');
body = body.replace(/"hasAuthorization"\s*:\s*\w+/g, '"hasAuthorization": true');
console.log(body);
$done({ body });
