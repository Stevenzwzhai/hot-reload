const querystring = require("querystring");

let url = "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=url%E7%99%BE%E5%88%86%E5%8F%B7%20%E7%BC%96%E7%A0%81&oq=url%25E7%2599%25BE%25E5%2588%2586%25E5%258F%25B7&rsv_pq=ab46e97a00006a17&rsv_t=5a22XHx8wlIqoKRotI7IOgKezNivML2089xDZovF7xRAoJD7J%2FBcGF4nAkY&rqlang=cn&rsv_enter=0&inputT=867597&sug=url%25E7%2599%25BE%25E5%2588%2586%25E5%258F%25B7%2520%25E8%25BD%25AC%25E4%25B9%2589&rsv_sug3=130&rsv_sug1=74&rsv_sug7=100&rsv_n=1&bs=url%E7%99%BE%E5%88%86%E5%8F%B7";
// let esUrl = querystring.unescape(url);
// console.log(esUrl);
// console.log(querystring.escape(esUrl));
// let url = querystring.parse('w=%D6%D0%CE%C4&foo=bar', null, null,
//                   { decodeURIComponent: gbkDecodeURIComponent });
//                   console.log(url);
console.log(querystring.parse(url));
let timeout = setTimeout(() => {
    // console.log(1);
},0)
console.log(timeout)