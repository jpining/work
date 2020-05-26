// express搭建界面服务器
const express = require('express')
const app = express();
const PORT = 2020;
const HOST_NAME = '10.31.160.50';
const path = require('path');

app.use(express.static(path.join(__dirname,'./client')))
app.listen( PORT,HOST_NAME,()=>{
    console.log(`网页展示的url为：http://${HOST_NAME}:${PORT}`)
})