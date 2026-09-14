import Link from "next/link"
import { RegisterForm } from "@/components/auth-forms"

export default function RegisterPage() {
  return <main className="grid min-h-screen place-items-center bg-[#fbf2e7] p-5"><div className="w-full max-w-md rounded-3xl border border-border bg-white p-7 shadow-sm sm:p-9"><Link href="/" className="mb-8 flex items-center gap-3" aria-label="VastrAI home"><span className="grid size-10 place-items-center rounded-xl bg-primary font-display text-xl font-bold text-primary-foreground">V</span><span><span className="block font-display text-lg font-bold">VastrAI</span><span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Studio</span></span></Link><h1 className="font-display text-3xl font-bold tracking-tight">Create your studio</h1><p className="mt-2 text-sm text-muted-foreground">A calm, creative workspace for your collection.</p><RegisterForm /></div></main>
}
