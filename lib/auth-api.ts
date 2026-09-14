import type { ApiError, AuthResponse, LoginRequest, RegisterRequest } from "./auth-types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "")

export class AuthApiError extends Error {
  readonly details: ApiError

  constructor(details: ApiError) {
    super(details.message)
    this.name = "AuthApiError"
    this.details = details
  }
}

async function request<T>(path: string, body?: unknown): Promise<T> {
  if (!API_BASE_URL) {
    throw new AuthApiError({ message: "Authentication service is not configured yet." })
  }

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      credentials: "include",
      body: body ? JSON.stringify(body) : undefined,
    })
    const payload = (await response.json().catch(() => null)) as ApiError | T | null
    if (!response.ok) {
      const error = payload && typeof payload === "object" && "message" in payload ? payload as ApiError : { message: "The authentication service returned an unexpected error." }
      throw new AuthApiError({ ...error, statusCode: response.status })
    }
    return payload as T
  } catch (error) {
    if (error instanceof AuthApiError) throw error
    throw new AuthApiError({ message: "We could not reach the authentication service." })
  }
}

export const authApi = {
  login: (requestBody: LoginRequest) => request<AuthResponse>("/api/v1/auth/login", requestBody),
  register: (requestBody: RegisterRequest) => request<AuthResponse>("/api/v1/auth/register", requestBody),
  me: () => request<AuthResponse>("/api/v1/auth/me"),
  logout: () => request<void>("/api/v1/auth/logout"),
}
