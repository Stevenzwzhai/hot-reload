const http = require("http");
const path = require("path");
const qs = require("querystring");

http.createServer((req, res) => {
    console.log(req.url == "/senddata");
    if(req.url == "/senddata"){
        res.writeHead(200,{
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'Access-Control-Allow-Origin': '*'
        });
        setInterval(function(){
          res.write('data: ' + +new Date() + '\n\n');
        }, 1000);
    }
    if(req.url == "/getusername"){
        let timeout = setTimeout(() => {
            // console.log(1);
        },0)
        res.writeHead(200, {
            'Content-Type':'text/plain',
            // 'Access-Control-Allow-Origin':"*"
        });
        console.log(timeout);
        res.write("asfasdf");
        res.end();
    }
}).listen(1003, () => {
    console.log("server 1003");
})