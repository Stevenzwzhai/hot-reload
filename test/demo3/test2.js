const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(__dirname+'/src'));


app.get('/', (req, res) => {
    res.status(200).send("test page");
})

app.listen(9999)