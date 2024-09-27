/***********************************


[rewrite_local]

# ～ k_line
^https?:\/\/api\.cmoney\.tw\/AuthorizationServer\/Authorization\/MobilePaid\/*? url script-response-body https://raw.githubusercontent.com/loveks520/QuXscript/refs/heads/main/k_line.js
^https?:\/\/mobile\.cmoney\.tw\/AuthorizationServer\/Authorization\/ExpiredTime\/MobilePaid\/*? url script-response-body https://raw.githubusercontent.com/loveks520/QuXscript/refs/heads/main/k_line.js
[mitm]
***********************************/
