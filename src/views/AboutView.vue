<template>
  <div>
    <div id="scanner-container" style="width: 100%; height: 300px;"></div>
    <p>扫描结果: {{ result }}</p>
    <p v-if="errorMsg" style="color: red;">错误: {{ errorMsg }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Quagga from 'quagga'

const result = ref('')
const errorMsg = ref('')

function isGetUserMediaSupported() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
}

onMounted(() => {
  if (!isGetUserMediaSupported()) {
    errorMsg.value = '当前微信版本或浏览器不支持摄像头访问，请升级微信或使用微信扫一扫'
    return
  }

  Quagga.init({
    inputStream: {
      name: 'Live',
      type: 'LiveStream',
      target: document.querySelector('#scanner-container'),
      constraints: {
        facingMode: 'true' // 后置摄像头
      }
    },
    decoder: {
      readers: ['code_128_reader', 'ean_reader', 'ean_8_reader', 'code_39_reader']
    }
  }, err => {
    if (err) {
      errorMsg.value = '初始化扫码失败: ' + err.message
      console.error(err)
      return
    }
    Quagga.start()
  })

  Quagga.onDetected(data => {
    result.value = data.codeResult.code
    Quagga.stop()
  })
})

onBeforeUnmount(() => {
  Quagga.stop()
})
</script>


