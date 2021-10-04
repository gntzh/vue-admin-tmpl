export interface TokenPayload {
  type: string
  user_id: string
  exp: number
}

export function decode<T = TokenPayload>(token: string): T {
  return JSON.parse(
    decodeURIComponent(escape(window.atob(token.split('.')[1]))),
  )
}

export function isExpired(exp: number) {
  const date = new Date()
  return date.getTime() > exp * 1000
}
