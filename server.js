const path = require("path");
const fs = require("fs");
const mime = require("mime");
const chokidar = require("chokidar");
const express = require("express");
const app = express();
const publicPath = path.resolve(__dirname, "./src");
var log = console.log.bind(console);

//设置监听
const watcher = chokidar.watch(publicPath);

watcher
    .on('add', pathUrl => {
        log(`File ${pathUrl} has been added`)  
        log(path.resolve(__dirname, pathUrl));
    })
    .on('change', pathUrl => {
        log(`File ${pathUrl} has been changed`)
    })
    .on('unlink', pathUrl => {
        log(`File ${pathUrl} has been removed`)
    });
app.use(express.static(publicPath,{
    setHeaders:function(res,path,stat) {
        // if(res && path.indexOf("/public/lab/wwwdemo")>-1) {
            res.setHeader("Content-type","text/html");
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

var server = app.listen(8989, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});