<template lang="pug">
  .container
    canvas#canvas.canvas(v-bind:width="this.screenWidth" v-bind:height="this.screenHeight")
</template>

<script>
import io from 'socket.io-client'

export default {
  data() {
    return {
      connection: null,
      screenWidth: 0,
      screenHeight: 0,
      canvas: null,
      startY: 0,
      endY: 0,
      distance: 0,
      border: 0,
      ctx: null,
      totalFrame: 0
    }
  },
  mounted: function() {
    this.InitConfig() //Configの初期化
    this.InitCanvas() //Canvasの初期化
    this.InitWebsocket('ws://192.168.0.19:5000/') //WebSocketの初期化
  },
  methods: {
    //Configの初期化
    InitConfig() {
      this.screenWidth = window.innerWidth
      this.screenHeight = window.innerHeight

      this.border = this.screenHeight / 2
    },

    //Canvasの初期化
    InitCanvas() {
      this.$nextTick(() => {
        this.canvas = document.getElementById('canvas')
        this.canvas.addEventListener('touchstart', this.StartTouch, false)
        this.canvas.addEventListener('touchmove', this.MoveTouch, false)
        this.canvas.addEventListener('touchend', this.LeaveTouch, false)

        this.ctx = this.canvas.getContext('2d')
      })
    },

    InitWebsocket(_address) { 
      //接続する
      this.connection = new WebSocket(_address)

      //接続成功時の処理
      this.connection.onopen = function(e) {
        console.log(e)
      }
    },

    //WebSocketを送る
    WSSend() {
      this.connection.send('Hoge')
      console.log("Send")
    },

    //タッチが開始したとき
    StartTouch(e) {      
      let y = e.touches[0].pageY
      y -= this.canvas.offsetTop
      this.startY = y

      e.preventDefault()
    },

    //指が動いているとき
    MoveTouch(e) {      
      let y = e.touches[0].pageY
      y -= this.canvas.offsetTop
      this.endY = y

      let x = e.touches[0].pageX
      x -= this.canvas.offsetLeft
      
      this.ctx.clearRect(0, 0, this.innerWidth, this.innerHeight)

      this.ctx.beginPath()

      this.ctx.arc( x, this.endY, 30, 0 * Math.PI / 180, 360 * Math.PI / 180, false )
      this.ctx.fillStyle = "rgba(200,200,200,0.8)"
      this.ctx.fill()
    },

    //指が離れたとき
    LeaveTouch(e) {
      this.distance = this.startY - this.endY

      console.log(this.startY)
      console.log(this.endY)
      console.log(this.distance)
      
      if(this.startY > this.border) {
        
        if(this.border > this.endY) {

          if(this.distance > 100) {

            this.WSSend()
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
  $color: #333;
  .title {
    color: $color;
    text-align: center;
    padding: 100px 0;
  }
  .button {
    width: 50vw;
    height: 50vw;
    background-color: #ccc;
    border-radius: 50%;
    margin: 0 auto;
  }
  .canvas {
    position: fixed;
    top: 0;
    left: 0;
  }
</style>
