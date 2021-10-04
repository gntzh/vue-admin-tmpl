import { reactive } from 'vue'
import * as authAPI from '@/api/auth'
import * as jwt from '@/utils/jwt'
import http from '@/utils/http'
export interface IAuth {
  accessToken: string
}
export interface IUserInfo {
  id: string
  username: string
  email: string
}

const auth = reactive<IAuth>({
  accessToken: '',
})

const userInfo = reactive<IUserInfo>({
  id: '',
  username: '',
  email: '',
})

function SET_ACCESS_TOKEN(token: string) {
  auth.accessToken = token
  if (token) {
    localStorage.setItem('accessToken', token)
    http.defaults.headers.common['Authorization'] = 'Bearer ' + token
  } else {
    localStorage.removeItem('accessToken')
    delete http.defaults.headers.common['Authorization']
  }
}

async function logOut() {
  SET_ACCESS_TOKEN('')
  localStorage.removeItem('refreshToken')
}

async function getUserInfo() {
  try {
    const { data } = await authAPI.getMe()
    userInfo.id = data.id
    userInfo.username = data.username
    userInfo.email = data.email
    return true
  } catch (error) {
    logOut()
    return false
  }
}

async function logInLocally() {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    try {
      const { exp } = jwt.decode(accessToken)
      if (!jwt.isExpired(exp)) {
        try {
          SET_ACCESS_TOKEN(accessToken)
          return await getUserInfo()
        } catch (error) {}
      }
      localStorage.removeItem('accessToken')
    } catch (error) {}
  }

  const refreshToken = localStorage.getItem('refreshToken')
  if (refreshToken) {
    try {
      const { exp } = jwt.decode(refreshToken)
      if (!jwt.isExpired(exp)) {
        try {
          const {
            data: { accessToken },
          } = await authAPI.refreshToken(refreshToken)
          SET_ACCESS_TOKEN(accessToken)
          return await getUserInfo()
        } catch (error) {}
      }
    } catch (error) {}
  }
  return false
}

async function logIn(
  username: string,
  password: string,
  rememberMe: boolean = false,
) {
  try {
    const { data } = await authAPI.logInGetToken(username, password)
    SET_ACCESS_TOKEN(data.accessToken)
    if (rememberMe) {
      window.localStorage.setItem('refreshToken', data.refreshToken)
    }
    return await getUserInfo()
  } catch (e) {
    return false
  }
}

export { auth, userInfo, logIn, logOut, logInLocally }
