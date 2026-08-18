/*
優分析 一鍵全解鎖 (精簡版)
*/
var body = $response.body;

body = body.replace(/"free"\s*:\s*0/g, '"free": 1');
body = body.replace(/"require_pay"\s*:\s*1/g, '"require_pay": 0');
body = body.replace(/"owned"\s*:\s*0/g, '"owned": 1');
body = body.replace(/"ever_purchased"\s*:\s*0/g, '"ever_purchased": 1');
body = body.replace(/"subscription"\s*:\s*\d+/g, '"subscription": 99');
body = body.replace(/"require_pay"\s*:\s*1/g, '"require_pay": 0');
$done({ body });
