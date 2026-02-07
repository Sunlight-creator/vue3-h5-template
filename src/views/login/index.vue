<template>
  <div class="login-container">
    <div>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="form.strUser"
            name="用户名"
            label="用户名"
            placeholder="请填写用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="form.strPwd"
            type="password"
            name="密码"
            label="密码"
            placeholder="请填写密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <van-field
            v-model="form.strAccount"
            type="password"
            name="账套"
            label="账套"
            placeholder="请填写账套"
            :rules="[{ required: true, message: '请填写账套' }]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit"> 提交 </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, getCurrentInstance } from 'vue'
import { showToast } from 'vant'
import { login } from '../../api/index'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'
const router = useRouter();
const { proxy } = getCurrentInstance()
interface LoginForm {
  strUser: string
  strPwd: string
  strAccount: string
}

let form = reactive<LoginForm>({
  strUser: '',
  strPwd: '',
  strAccount: ''
})

const onSubmit = (values: LoginForm): void => {
  console.log('submit', values)
  if (values) {
    Cookies.set('username', form.strUser, { expires: 30 })
    Cookies.set('password', form.strPwd, { expires: 30 })
    Cookies.set('strAccount', form.strAccount, { expires: 30 })
    loginSubmit()
  }
}


interface UserData {
  token: string
  userId: number
  cookie?: string
  data?: any
}

interface LoginResponse<T = any> {
  code: number
  data: T
  message?: string
}

const loginSubmit = async (): Promise<UserData | false> => {


  proxy.$toast.showLoading('加载中...')

  try {
    const res: LoginResponse<UserData> = await login(form)
    const { code, data } = res

    if (code !== 200) {
      proxy.$toast.clear()
      proxy.$toast.showToast?.(res.message || '登录失败')
      return false
    }

    if (data.cookie) {
      Cookies.set('small-cookie', data.cookie)
    }



    showToast('登录成功')
    router.push({ path: '/'})
    return data
  } catch (error) {
    showToast(error)
    throw error
  } finally {
    proxy.$toast.clear()
  }
}


const getCookie = (): void => {
  const username = Cookies.get('username');
  const password = Cookies.get('password');
  const strAccount = Cookies.get('strAccount');

  form = {
    strUser: username === undefined ? form.strUser : username,
    strPwd: password === undefined ? form.strPwd : password,
    strAccount: strAccount === undefined ? form.strAccount : strAccount,
  };
};

getCookie();

</script>

<style lang="scss" scoped></style>
