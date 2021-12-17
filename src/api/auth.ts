import http from '@/utils/http'
import {
  ILogInGetTokenRes,
  IMessageRes,
  IRefreshTokenRes,
  IUserInfo,
  PasswordChange,
} from './schemas'

export async function logInGetToken(username: string, password: string) {
  const params = new URLSearchParams()
  params.append('username', username)
  params.append('password', password)
  params.append('grant_type', 'password')
  return http.post<ILogInGetTokenRes>('auth/token/', params)
}

export async function refreshToken(refreshToken: string) {
  return http.post<IRefreshTokenRes>('auth/token/refresh/', {
    refreshToken,
  })
}

export async function getMe() {
  return http.get<IUserInfo>('users/me/')
}

export async function recoverAccount(email: string) {
  return http.post<IMessageRes>('auth/recovery/', { email })
}

export async function resetPassword(token: string, newPassword: string) {
  return http.post<IMessageRes>('auth/password/reset/', { token, newPassword })
}

export async function changePassword(data: PasswordChange) {
  return http.put<IMessageRes>('auth/password/', data)
}

export async function requestEmailVerification() {
  return http.get<IMessageRes>('auth/emails/request-verification/')
}

export async function confirmEmailVerification(token: string) {
  return http.post<IMessageRes>('auth/emails/confirm-verification/', { token })
}
