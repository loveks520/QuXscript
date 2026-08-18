/*
付費牆極簡解鎖
*/
let obj = JSON.parse($response.body);
obj.activeProducts = obj.productsForSale || [];
obj.paywallId = null;
$done({ body: JSON.stringify(obj) });
