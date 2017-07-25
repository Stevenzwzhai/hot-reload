const http = require('http');
const WebSocketServer = require('websocket').server;

const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    console.log((new Date()) + ' Received request for ' + req.url);
    res.writeHead(404);
    res.end();
}).listen(9988, () => {
    console.log('server bound');
});

wsServer = new WebSocketServer({
    httpServer: server,
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
    // if (!originIsAllowed(request.origin)) {
    //   // Make sure we only accept requests from an allowed origin
    //   request.reject();
    //   console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
    //   return;
    // }
    
    var connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');

    setTimeout(() => {
        connection.send(JSON.stringify({
                        id:"",
                        file:""
                    }))}, 5000)
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF(JSON.stringify({
                id:"",
                file:message.utf8Data
            }));
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            // connection.sendBytes(JSON.stringify({
            //     id:"",
            //     file:message.binaryData
            // }));
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });

    console.log(path.join(__dirname, './'));
    fs.watch(path.join(__dirname, './vue-iview'), (eventType, filename) => {
        switch(eventType){
            case "rename":console.log(`rename:${filename}`);
                break;
            case "change":deal(filename);
                break;
            default :console.log(`de:${filename}`);
        }
    });

    function deal(filename){
        let extname = path.extname(filename);
        console.log('deal', extname, filename, extname.replace(/[(\.js)|(\.html)|(\.css)]/g,""))
        if(extname == ".js"){
            // console.log(filename);
            connection.send(JSON.stringify({
                id:"change",
                file:'./vue-iview/'+filename
            }))
        }

    }
});

