import http from '@/utils/http'
import { ILogInGetTokenRes, IRefreshTokenRes, IUserInfo } from './schemas'

export async function logInGetToken(username: string, password: string) {
  const params = new URLSearchParams()
  params.append('username', username)
  params.append('password', password)
  params.append('grant_type', 'password')
  return http.post<ILogInGetTokenRes>('auth/token', params)
}

export async function refreshToken(refreshToken: string) {
  return http.post<IRefreshTokenRes>('auth/token/refresh', {
    refreshToken,
  })
}

export async function getMe() {
  return http.get<IUserInfo>('users/me')
}
