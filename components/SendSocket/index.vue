<template lang="pug">
  .container
    canvas#canvas.canvas(v-bind:width="this.screenWidth" v-bind:height="this.screenHeight")
</template>

<script>
import Sender from './js/Sender'

export default {
  data() {
    return {
      screenWidth: 0,
      screenHeight: 0,
      canvas: null,
    }
  },
  mounted: function() {
    this.InitConfig() //Configの初期化
    this.InitSender() //Canvasの初期化
  },
  methods: {
    //Configの初期化
    InitConfig() {
      this.screenWidth = window.innerWidth
      this.screenHeight = window.innerHeight
    },

    //Senderの初期化
    InitSender() {
      this.$nextTick(() => {
        //Canvasを取得
        this.canvas = document.getElementById('canvas')
        
        //Senderを初期化
        this.sender = new Sender(this.canvas)
      })
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
