

// 服务器连接
const port  = 10086;
const host_name = '10.31.160.50';
const server = `ws://${host_name}:${port}`;
const client = new WebSocket(server);

// 获取服务端信息，展示在页面上
const username = document.querySelector('.inputName')//用户名输入框
client.onmessage = function(msg){
    let userNameValue = username.value;
    const li = document.createElement('li');
    const ul = document.querySelector('.show_box')
    li.innerHTML = userNameValue + ':'+ msg.data;
    ul.appendChild(li)
}

// 点击发送内容
const btn = document.querySelector('.sendBth');//确定按钮
btn.onclick = function(){
    sendSMS();
    console.log(username.value)
}
// 回车发送内容
document.onkeydown = function (e){
    if(e.keyCode==13){
        sendSMS()
    }
}
// 发送内容
const messages = document.querySelector('.msginput')
function sendSMS (){
    const val = messages.value;
    if(val){
        client.send(val);
        messages.value = ''
    }else{
        alert('请输入内容')
    }
}

// 首次登录
const confirmBtn = document.querySelector('.confirm');
confirmBtn.onclick = function (){
    // client.onopen=function(){
        let userNameValue = username.value;
        client.send(`欢迎${userNameValue}进入直播间`)
    // }
    // 关闭窗口
    closeNameBox();
} 
// 关闭窗口
function closeNameBox(){
    const nameBox =  document.querySelector('#nameBox');
    nameBox.style.display = 'none';
}