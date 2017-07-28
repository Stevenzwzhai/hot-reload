const babel = require('babel-core');
const path = require("path");
const fs = require("fs");
babel.transformFile(path.resolve(__dirname, '../../src/ws.js'), {
    sourceMap:true
}, (err, result) => {
    if(err){
        console.log('asdf')
        throw err;
    }
    fs.stat(path.resolve(__dirname, "../../build"), (err, stats) => {
        if(err){
            console.log(12)
            fs.mkdir(path.resolve(__dirname, "../../build"), err => {
                console.log(err);
            })
        }else{
            console.log(JSON.stringify(stats))
            fs.writeFile(path.resolve(__dirname, '../../build', result.map.sources[0]), result.code, (err) => {
                if(err){
                    throw err;
                }
            })
        }
        
    })
    
})