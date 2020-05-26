// 服务器搭建
const ws = require('ws');
const host = '10.31.160.50';
const port = 10086;
const server = new ws.Server({
    host,port
})

// 客户端编号
let count = 9000;
const clients = [];
// 获取客户端进行编号，存在clients中 
server.on('connection',client =>{  //只要有客户端连接就会触发
    //client=>当前客户端
    client.name = ++count
    // 当前客户端存储在数组中
    clients[client.name] = client;
    // 获取客户端数据
    client.on('message',msg =>{
        //  msg=> 客户端数据
        msg.name = client.name;
        console.log(msg.toString());
        // 广播收到的消息
        boradcast(client,msg);
    })
    // 异常处理
})
// 创建广播将客户端消息广播出来
function boradcast (client,msg){
    // 广播所有消息 msg=>客户端消息 Buffer类型
    for (let key in clients ){
        clients[key].send(msg.toString())
    }
}
// 启用监听
server.on('listening',()=>{
    console.log(`The server is running at: ws://${host}:${port}`)
})