console.log('socket.js被调用');

export default {
    // 保证整个项目只有一个ws实例
    ws: null, // ws单例
    init(config, onMessage, onError) {
        console.log('init被调用');

        if (!this.ws) {
            // 实例化ws
            this.ws = new WebSocket(`ws://localhost:3000/${config.user.id}`)
        }

        // 客户端接收消息
        this.ws.onmessage = e => {
            let message = JSON.parse(e.data)
            onMessage && onMessage(message)
        }

        // 错误处理
        this.ws.onerror = err => {
            onError && onError(err)
        }

        this.ws.onclose = () => this.ws = null
    },

    send(msgObj) { // 发送消息
        this.ws.send(JSON.stringify(msgObj))
    }
}
