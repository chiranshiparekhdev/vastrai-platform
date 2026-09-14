export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  shopName: string
}

export interface AuthUser {
  id: string
  name: string
  email: string
  shopName?: string
}

export interface AuthResponse {
  user: AuthUser
}

export interface ApiError {
  statusCode?: number
  message: string
  code?: string
  fieldErrors?: Record<string, string[]>
}

export type AuthStatus = "authenticated" | "unauthenticated" | "loading"
export interface AuthState {
  status: AuthStatus
  user: AuthUser | null
}
