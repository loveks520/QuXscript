/*
如果有結果就執行以下代碼
*/
var body = $response.body;

// 將 owned 與 ever_purchased 改為 1
body = body.replace(/"owned"\s*:\s*\d+/g, '"owned": 1');
body = body.replace(/"ever_purchased"\s*:\s*\d+/g, '"ever_purchased": 1');

console.log(body);
$done({ body });
