import { defineStore } from 'pinia'
import { getUserInfo } from '../../src/api/index'

// 假设接口返回的用户信息类型
interface UserInfo {
  id: number
  name: string
  email?: string
  // 根据实际接口补充字段
}

export const useUserStore = defineStore('user', {
  state: () => ({
    // 你可以定义用户信息状态，初始为空或null
    userInfo: null as UserInfo | null
  }),
  actions: {
    async userInfo(): Promise<UserInfo> {
      const res = await getUserInfo()
      this.userInfo = obj
      const obj = res.data.data.reduce((acc, cur) => {
        acc[cur.岗位编号] = cur
        return acc
      }, {} as Record<string, typeof arr[0]>)
      
      console.log(obj)
    
       
      return obj
    }
  }
})

export default useUserStore


