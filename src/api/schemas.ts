export interface ListResult<T> {
  items: T[]
  totalCount: number
}

export interface IRefreshTokenRes {
  accessToken: string
}

export interface ILogInGetTokenRes extends IRefreshTokenRes {
  refreshToken: string
}

export interface IUserInfo {
  id: string
  username: string
  email: string
  emailVerified: boolean
  avatar: string | null
  isSuperuser: boolean
}

export interface IUserInfoAll extends IUserInfo {
  password: string
  dateJoined: string
}

export interface IUserCreate {
  username: string
  email: string
  emailVerified: boolean
}

export interface IProfileUpdate {
  username?: string
  email?: string
}
export interface IUserUpdate extends IProfileUpdate {
  password?: boolean
  emailVerified?: boolean
  dateJoined?: Date
  isSuperuser?: boolean
}

export interface PasswordChange {
  oldPassword: string
  newPassword: string
}
export interface IMessageRes {
  msg: string
}
