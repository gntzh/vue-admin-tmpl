import http from '@/utils/http'
import * as schemas from './schemas'

export async function getUser(id: string) {
  return http.get<schemas.IUserInfoAll>(`users/${id}/`)
}

export async function createUser(data: schemas.IUserCreate) {
  return http.post<schemas.IUserInfo>('users/', data)
}

export async function listUsers(offset: number, limit: number = 10) {
  return http.get<schemas.ListResult<schemas.IUserInfo>>('users/', {
    params: { offset, limit },
  })
}

export async function updateUser(id: string, data: schemas.IUserUpdate) {
  return http.patch<schemas.IUserInfoAll>(`users/${id}/`, data)
}

export async function updateProfile(data: schemas.IProfileUpdate) {
  return http.patch<schemas.IUserInfo>(`users/me/`, data)
}
