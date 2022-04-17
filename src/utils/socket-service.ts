/*
 * @Description:
 * @Author:
 * @Date: 2022-04-07 09:08:40
 * @LastEditTime: 2022-04-07 17:48:13
 * @LastEditors: Please set LastEditors
 */
class SocketService {
    /**
     * 单例
     */
    static instance: SocketService;
    static get Instance() {
        if (!this.instance) {
            this.instance = new SocketService();
        }
        return this.instance;
    }

    // 和服务端连接的socket对象
    // ws = null
    ws!: WebSocket;

    // 存储回调函数
    callBackMapping: any = {};

    // 标识是否连接成功
    connected = false;

    // 记录重试的次数
    sendRetryCount = 0;

    // 重新连接尝试的次数
    connectRetryCount = 0;

    // 定义连接服务器的次数
    connect() {
        // 连接服务器
        if (!window.WebSocket) return console.log("当前浏览器不支持websocket");
        // this.ws = new WebSocket(`ws://${window.location.host}`);
        this.ws = new WebSocket("ws://localhost:9998");
        // ws://localhost:9998
        // 连接成功的事件
        this.ws.onopen = () => {
            this.connected = true;
            // 重置重试次数
            this.connectRetryCount = 0;
            console.log("连接成功");
        };

        // 连接失败的事件
        // 1.1 连接成功后 服务器关闭的情况
        this.ws.onclose = () => {
            this.connected = false;
            console.log("连接关闭");
            this.connectRetryCount++;
            setTimeout(() => {
                this.connect();
            }, 500 * this.connectRetryCount);
        };

        // 得到服务器端发送过来的数据
        this.ws.onmessage = (msg: any) => {
            console.log("从服务器端接收到数据");
            // 服务器发送过来的真正原始数据 在 msg中的data里
            const data = JSON.parse(msg.data);
            const socketType = data.socketType; // sellerData
            // 判断回调函数是否存在
            if (this.callBackMapping[socketType]) {
                const action = data.action; // getData
                if (action === "getData") {
                    // const realData = JSON.parse(data.data);
                    this.callBackMapping[socketType].call(this, data.data);
                } else if (action === "fullScreen") {
                    this.callBackMapping[socketType].call(this, data);
                } else if (action === "themeChange") {
                    this.callBackMapping[socketType].call(this, data);
                }
            }
        };
    }
    // 回调函数的注册
    registerCallBack(socketType: string, callBack: any) {
        this.callBackMapping[socketType] = callBack;
        // console.log(this.callBackMapping[socketType]);
        // debugger;
    }

    // 取消某一个回调函数
    unRegisterCallBack(socketType: string) {
        this.callBackMapping[socketType] = null;
    }

    // 发送数据的方法
    send(data: any) {
        if (this.connected) {
            this.sendRetryCount = 0;
            this.ws.send(JSON.stringify(data));
        } else {
            this.sendRetryCount++;
            setTimeout(() => {
                this.send(data);
            }, 500 * this.sendRetryCount);
        }
    }
}

export default SocketService;
