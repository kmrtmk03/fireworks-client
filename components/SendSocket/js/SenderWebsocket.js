export default class SenderWebsocket {
  constructor() {
    //変数
    this.connection = null
    
    //初期化
    this.Init()
  }

  Init() {
    //接続する
    this.connection = new WebSocket('ws://192.168.0.19:5000/')

    //接続成功時の処理
    this.connection.onopen = function(e) {
      console.log(e)
    }
  }

  //送る処理
  ActionSend() {
    this.connection.send('Hoge')
  }
}