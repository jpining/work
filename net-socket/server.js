//! 创建服务器端
// 引入net模块（内置模块）
const net = require('net');
const fs = require('fs');
const path = require('path');
// 创建服务器
const server = net.createServer();
// 域名，端口号
const PORT = 10010;
const HOST_NAME = 'localhost';
// 区分客户端
let count = 9000;
// 存放客户端
const clients = [];
// 只要有客户端连接就会触发
server.on('connection',socket =>{
    // socket表示客户端
    socket.name = ++count;
    // 给数组中相应下标保存当前客户端
    clients[socket.name] = socket;
    
    
    // 接收客户端发来的信息
    socket.on('data',msg=>{
        // msg =>相应的信息  buffer类型   转为字符串，替换消息中的字符
        console.log(socket.name +':'+msg.toString().replace('谁',msg.name))
        // 广播收到的消息
        broadcast(socket,msg)
        
        // 异常处理
        socket.on('error',error=>{
            fs.writeFile(path.join(__dirname,'./log/errd.text'),error,(err)=>{
                
            })
        });
        socket.on('close',()=>{
            console.log(socket.name + '下线了')
            delete(clients[socket.name])
        })
    })
})

// 创建一个广播将客户端发来的消息广播出来

function broadcast(socket,msg){
    socket.write( ` ${socket.name}：${msg} `)
}

// 启动监听
server.listen(PORT,HOST_NAME,()=>{
    console.log(  `The server is running at :http://${HOST_NAME}:${PORT} `  )
})