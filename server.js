const path = require("path");
const fs = require("fs");
const mime = require("mime");
const chokidar = require("chokidar");
const websocketServer = require('websocket').server;
const babel =require('babel-core');
const express = require("express");
const app = express();
const appWs = express();
const publicPath = path.resolve(__dirname, "./src");
var log = console.log.bind(console);

//设置监听
const watcher = chokidar.watch(publicPath);

// watcher
//     .on('add', pathUrl => {
//         log(`File ${pathUrl} has been added`)  
//         log(path.resolve(__dirname, pathUrl));
//     })
//     .on('change', pathUrl => {
//         log(`File ${pathUrl} has been changed`)
//     })
//     .on('unlink', pathUrl => {
//         log(`File ${pathUrl} has been removed`)
//     });
app.use(express.static(publicPath,{
    setHeaders:function(res,path,stat) {
        console.log(path, stat);
        // if(res && path.indexOf("/public/lab/wwwdemo")>-1) {
            res.setHeader("Content-type","text/plain");
            
        // }
    }
}));
app.get("/", (req, res, next) => {
    let currPath = path.resolve(publicPath, 'index.html');
    // fs.readFile(currPath, 'binary', (err, data) => {
    //     if(err){
    //         res.status(404).send("not found");
    //     }
    //     res.set({
    //         "Content-Type":mime.lookup(currPath)
    //     })
    //     res.send(data.toString());
    // })
    res.sendFile(currPath);
    // next();
})

let server = app.listen(8989, function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

appWs.get('/', (req, res, next) => {
    res.status(404).send('not found');
})

let serverWs = appWs.listen(8988, () => {
    console.log("ws server bundle");
})


let wsServer = new websocketServer({
    httpServer: serverWs,
    // You should not use autoAcceptConnections for production 
    // applications, as it defeats all standard cross-origin protection 
    // facilities built into the protocol and the browser.  You should 
    // *always* verify the connection's origin and decide whether or not 
    // to accept it. 
    autoAcceptConnections: false
});
 
function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed. 
  return true;
}
 
wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin 
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }
    
    var connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF(message.utf8Data);
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});