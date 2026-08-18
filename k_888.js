/*
如果有結果就執行以下代碼
*/
var body = $response.body; // 令 body 為響應體

// 修改 subscription 欄位為 99
body = body.replace(/"subscription"\s*:\s*\d+/g, '"subscription": 99');

console.log(body);
$done({ body });
