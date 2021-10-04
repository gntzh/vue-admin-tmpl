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
}
