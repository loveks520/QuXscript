/*
優分析 + IAPHub 全鏈路解鎖與檢查腳本
*/
const url = $request.url;
let body = $response.body;

if (body) {
  try {
    let obj = JSON.parse(body);

    // [檢查 1] IAPHub 內購狀態
    if (url.includes("api.iaphub.com")) {
      console.log(`[UAnalyze-Debug] 命中 IAPHub 授權 API: ${url}`);
      if (obj.productsForSale && obj.productsForSale.length > 0) {
        obj.activeProducts = obj.productsForSale;
        obj.paywallId = null;
        console.log("[UAnalyze-Debug]  IAPHub 付費牆已解除，已啟用 activeProducts");
      }
      body = JSON.stringify(obj);
    }

    // [檢查 2] 使用者個人資訊 (/user/info)
    else if (url.includes("/user/info")) {
      console.log(`[UAnalyze-Debug] 命中 使用者資訊 API: ${url}`);
      if (obj.data) {
        obj.data.subscription = 99;
        obj.data.is_socialite = 10;
        console.log("[UAnalyze-Debug]  使用者 subscription 改為 99, is_socialite 改為 10");
      }
      body = JSON.stringify(obj);
    }

    // [檢查 3] 產品資訊 / 主題頁面 (/app/product, /products)
    else if (url.includes("/product")) {
      console.log(`[UAnalyze-Debug] 命中 產品頁面 API: ${url}`);
      let str = JSON.stringify(obj);
      str = str.replace(/"free"\s*:\s*0/g, '"free": 1');
      str = str.replace(/"require_pay"\s*:\s*1/g, '"require_pay": 0');
      str = str.replace(/"owned"\s*:\s*0/g, '"owned": 1');
      str = str.replace(/"ever_purchased"\s*:\s*0/g, '"ever_purchased": 1');
      console.log("[UAnalyze-Debug]  產品所有 free/require_pay/owned 限制已解鎖");
      body = str;
    }

    // [檢查 4] 股票清單與指標數據 (修正評分空字串問題)
    else {
      console.log(`[UAnalyze-Debug] 命中 數據 API: ${url}`);
      let str = JSON.stringify(obj);
      str = str.replace(/"free"\s*:\s*0/g, '"free": 1');
      str = str.replace(/"require_pay"\s*:\s*1/g, '"require_pay": 0');
      str = str.replace(/"ua80211_cp"\s*:\s*0/g, '"ua80211_cp": 1');
      // 將空字串的養雞評分補預設值 80
      str = str.replace(/"ua120041_cp"\s*:\s*""/g, '"ua120041_cp": 80');
      body = str;
    }

  } catch (e) {
    console.log(`[UAnalyze-Debug] ⚠️ JSON 解析例外 (改用字串正則替換): ${e.message}`);
    body = body.replace(/"free"\s*:\s*0/g, '"free": 1')
               .replace(/"require_pay"\s*:\s*1/g, '"require_pay": 0')
               .replace(/"owned"\s*:\s*0/g, '"owned": 1')
               .replace(/"ever_purchased"\s*:\s*0/g, '"ever_purchased": 1')
               .replace(/"ua80211_cp"\s*:\s*0/g, '"ua80211_cp": 1')
               .replace(/"ua120041_cp"\s*:\s*""/g, '"ua120041_cp": 80');
  }
}

$done({ body });
