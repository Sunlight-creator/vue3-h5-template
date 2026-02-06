import router from '../router/index'
import Cookies from 'js-cookie'
const whiteList = ['/login']
let isRoutesGenerated = false
import useUserStore from "../../src/stores/user";

router.beforeEach(async (to, from, next) => {
  const token = Cookies.get('small-cookie') 

  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
      return
    }
    if (whiteList.includes(to.path)) {
      next()
      return
    }
    if (!isRoutesGenerated) {
      try {
        useUserStore().userInfo()
 
        isRoutesGenerated = true
        next() // 重新导航，确保动态路由生效
      } catch (error) {
        Cookies.remove('small-cookie')
        next(`/login?redirect=${to.fullPath}`)
      }
    } else {
      next()
    }
  } else {
    // 未登录
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`)
    }
  }
})
