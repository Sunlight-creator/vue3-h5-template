import service from './../utils/request'
import CryptoJS from 'crypto-js'


// function encryptData(data: string): string {
//   const KEY = 'JFSOFTLS'
//   const IV = 'JFSOFTLS'
//   const key = CryptoJS.enc.Utf8.parse(KEY)
//   const iv = CryptoJS.enc.Utf8.parse(IV)
//   const encrypted = CryptoJS.DES.encrypt(data, key, {
//     iv: iv,
//     mode: CryptoJS.mode.CBC,
//     padding: CryptoJS.pad.Pkcs7
//   })
//   return encrypted.ciphertext.toString(CryptoJS.enc.Hex).toUpperCase()
// }


interface LoginParams {
  strUser: string
  strPwd: string
  strAccount: string
}

export function login(data: LoginParams) {

}




export function getUserInfo() {
  return service({
    url: '/sys/userInfo',
    method: 'post',
    data: {
        no: 
        1
    }
  })
}





// getUserInfo()

