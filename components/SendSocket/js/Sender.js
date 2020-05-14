import SenderWebsocket from './SenderWebsocket.js'

export default class Sender {
  constructor(props) {
    //変数
    this.canvas = props
    this.ctx = null
    this.startY = 0
    this.endY = 0
    this.distance = 0
    this.border = window.innerHeight / 2

    //初期化処理
    this.Init()

    //SenderWebSocketのインスタンスを作成
    this.senderWebsocket = new SenderWebsocket()
  }

  //初期化
  Init() {
    this.ctx = this.canvas.getContext('2d')

    //各動作のイベントリスナーを追加
    this.StartTouch()
    this.MoveTouch()
    this.LeaveTouch()
  }

  //タッチが開始したとき
  StartTouch() {
    this.canvas.addEventListener('touchstart', e => {
      console.log(this.canvas)
      let y = e.touches[0].pageY
      y -= this.canvas.offsetTop
      this.startY = y

      e.preventDefault()
    }, false)
  }

  //指が動いているとき
  MoveTouch() {
    this.canvas.addEventListener('touchmove', e => {
      let y = e.touches[0].pageY
      y -= this.canvas.offsetTop
      this.endY = y
  
      let x = e.touches[0].pageX
      x -= this.canvas.offsetLeft
      
      this.ctx.clearRect(0, 0, this.innerWidth, this.innerHeight)
  
      this.ctx.beginPath()
  
      this.ctx.arc( x, this.endY, 30, 0 * Math.PI / 180, 360 * Math.PI / 180, false )
      this.ctx.fillStyle = "rgba(200, 200, 200, 0.1)"
      this.ctx.fill()
    }, false)
  }

  //指が離れたとき
  LeaveTouch() {
    this.canvas.addEventListener('touchend', e => {
      this.distance = this.startY - this.endY

      console.log('start : ' + this.startY)
      console.log('end : ' + this.endY)
      console.log('distance : ' + this.distance)
      
      if(this.startY > this.border) {
        if(this.border > this.endY) {
          if(this.distance > 100) {
            this.senderWebsocket.ActionSend()
          }
        }
      }
    }, false)
  }


}