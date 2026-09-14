"use client"

import Link from "next/link"
import { useState } from "react"
import { Eye, EyeOff, LoaderCircle } from "lucide-react"
import { authApi, AuthApiError } from "@/lib/auth-api"

const inputClass = "w-full rounded-xl border border-border bg-white px-3.5 py-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return <p id={id} role="alert" className="text-xs font-medium text-primary">{children}</p>
}

function PasswordInput({ id, label, value, onChange, error }: { id: string; label: string; value: string; onChange: (value: string) => void; error?: string }) {
  const [visible, setVisible] = useState(false)
  const errorId = `${id}-error`
  return <div className="flex flex-col gap-2"><label htmlFor={id} className="text-sm font-semibold">{label}</label><div className="relative"><input id={id} name={id} type={visible ? "text" : "password"} value={value} onChange={(event) => onChange(event.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} className={`${inputClass} pr-12`} autoComplete={id === "password" ? "current-password" : "new-password"} /><button type="button" onClick={() => setVisible((current) => !current)} aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`} className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground">{visible ? <EyeOff data-icon="inline-start" /> : <Eye data-icon="inline-start" />}</button></div>{error && <FieldError id={errorId}>{error}</FieldError>}</div>
}

function ApiMessage({ message }: { message: string }) {
  return <div role="alert" className="rounded-xl border border-primary/25 bg-primary/5 px-3.5 py-3 text-sm text-primary">{message}</div>
}

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [apiMessage, setApiMessage] = useState<string>()
  const [submitting, setSubmitting] = useState(false)

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors: Record<string, string> = {}
    if (!email.trim()) nextErrors.email = "Enter your email address."
    else if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Enter a valid email address."
    if (!password) nextErrors.password = "Enter your password."
    setErrors(nextErrors)
    setApiMessage(undefined)
    if (Object.keys(nextErrors).length) return
    setSubmitting(true)
    try { await authApi.login({ email: email.trim(), password }) } catch (error) { setApiMessage(error instanceof AuthApiError ? error.message : "Something went wrong. Please try again.") } finally { setSubmitting(false) }
  }

  return <form onSubmit={submit} noValidate className="mt-8 flex flex-col gap-5">{apiMessage && <ApiMessage message={apiMessage} />}<div className="flex flex-col gap-2"><label htmlFor="email" className="text-sm font-semibold">Email</label><input id="email" name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@yourshop.com" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} className={inputClass} />{errors.email && <FieldError id="email-error">{errors.email}</FieldError>}</div><PasswordInput id="password" label="Password" value={password} onChange={setPassword} error={errors.password} /><button type="submit" disabled={submitting} className="mt-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">{submitting && <LoaderCircle className="animate-spin" data-icon="inline-start" />}{submitting ? "Signing in…" : "Sign in"}</button><p className="text-center text-sm text-muted-foreground">New to VastrAI? <Link href="/register" className="font-bold text-primary underline-offset-4 hover:underline">Create an account</Link></p></form>
}

export function RegisterForm() {
  const [values, setValues] = useState({ name: "", email: "", password: "", confirmPassword: "", shopName: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [apiMessage, setApiMessage] = useState<string>()
  const [submitting, setSubmitting] = useState(false)
  const update = (key: keyof typeof values) => (value: string) => setValues((current) => ({ ...current, [key]: value }))

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors: Record<string, string> = {}
    if (!values.name.trim()) nextErrors.name = "Enter your name."
    if (!values.shopName.trim()) nextErrors.shopName = "Enter your shop name."
    if (!values.email.trim()) nextErrors.email = "Enter your email address."
    else if (!/^\S+@\S+\.\S+$/.test(values.email)) nextErrors.email = "Enter a valid email address."
    if (values.password.length < 8) nextErrors.password = "Use at least 8 characters."
    if (values.confirmPassword !== values.password) nextErrors.confirmPassword = "Passwords do not match."
    setErrors(nextErrors)
    setApiMessage(undefined)
    if (Object.keys(nextErrors).length) return
    setSubmitting(true)
    try { await authApi.register({ name: values.name.trim(), email: values.email.trim(), password: values.password, shopName: values.shopName.trim() }) } catch (error) { setApiMessage(error instanceof AuthApiError ? error.message : "Something went wrong. Please try again.") } finally { setSubmitting(false) }
  }

  return <form onSubmit={submit} noValidate className="mt-8 flex flex-col gap-4">{apiMessage && <ApiMessage message={apiMessage} />}{([['name', 'Name', 'Your name', 'name'], ['shopName', 'Shop name', 'Your shop name', 'organization'], ['email', 'Email', 'you@yourshop.com', 'email']] as const).map(([key, label, placeholder, autoComplete]) => <div key={key} className="flex flex-col gap-2"><label htmlFor={key} className="text-sm font-semibold">{label}</label><input id={key} name={key} type={key === 'email' ? 'email' : 'text'} value={values[key]} onChange={(event) => update(key)(event.target.value)} placeholder={placeholder} autoComplete={autoComplete} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `${key}-error` : undefined} className={inputClass} />{errors[key] && <FieldError id={`${key}-error`}>{errors[key]}</FieldError>}</div>)}<PasswordInput id="password" label="Password" value={values.password} onChange={update("password")} error={errors.password} /><PasswordInput id="confirmPassword" label="Confirm password" value={values.confirmPassword} onChange={update("confirmPassword")} error={errors.confirmPassword} /><button type="submit" disabled={submitting} className="mt-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">{submitting && <LoaderCircle className="animate-spin" data-icon="inline-start" />}{submitting ? "Creating account…" : "Create account"}</button><p className="text-center text-sm text-muted-foreground">Already have an account? <Link href="/login" className="font-bold text-primary underline-offset-4 hover:underline">Sign in</Link></p></form>
}
