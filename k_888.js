/*
如果有結果就執行以下代碼
*/
var body = $response.body;

// 修改欄位數值
body = body.replace(/"subscription"\s*:\s*\d+/g, '"subscription": 2');
body = body.replace(/"is_socialite"\s*:\s*\d+/g, '"is_socialite": 10');

console.log(body);
$done({ body });
