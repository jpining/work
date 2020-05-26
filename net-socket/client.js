// 客户端建立
const net = require('net');
// 引入内置模块
const req = require('readline');
const fs = require('fs');
const path = require('path');
// 定义
const socket = new net.Socket();
const PORT = 10010;
const  HOST_NAME = 'localhost';
// 客户端连接服务器

// 提供接口来读取可读流
const r = req.createInterface({
    input:process.stdin,
    output:process.stdout
})
// 有服务端连接服务器就触发
socket.connect(PORT,HOST_NAME,()=>{
    socket.write('欢迎来到直播间')
})
// 接收前端发来的消息
socket.on('data',msg=>{
    console.log( msg.toString());
    say();
})
    // 异常处理
    socket.on('error',error=>{
        fs.writeFile(path.join(__dirname,'./log/errd.text'),error,(err)=>{
            
        })
    });
    // close() 方法会关闭 readline.Interface 实例 
    // destroy()  销毁流并关闭连接
    socket.on('close',()=>{
        console.log('正常下线')
        socket.destroy()
        r.close()
    })
function say  (){
    r.question('请输入：',message=>{
        if(message=='bye'){
            socket.destroy();
            r.close()
        }else{
            socket.write( message +'/n')
        }
    })
}