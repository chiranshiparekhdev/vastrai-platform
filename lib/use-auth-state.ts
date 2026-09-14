"use client"

import { useState } from "react"
import type { AuthState } from "./auth-types"

export function useAuthState(): AuthState {
  const [state] = useState<AuthState>({ status: "unauthenticated", user: null })
  return state
}
