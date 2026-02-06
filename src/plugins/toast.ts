
import type { App } from 'vue'
import { closeToast } from 'vant'

let loadingInstance: ReturnType<typeof showLoadingToast> | null = null

export default {
  install(app: App) {
    app.config.globalProperties.$toast = {
      showLoading(message = '加载中...') {
        if (loadingInstance) {
          // 如果已有加载提示，先关闭
          closeToast()
        }
        loadingInstance = showLoadingToast({
          message,
          forbidClick: true,
        })
      },
      clear() {
        if (loadingInstance) {
          closeToast()
          loadingInstance = null
        }
      }
    }
  }
}
