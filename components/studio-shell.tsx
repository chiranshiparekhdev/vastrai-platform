"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { BarChart3, ChevronDown, FolderOpen, GalleryVerticalEnd, ImagePlus, LayoutDashboard, Menu, Package, PanelLeftClose, Settings, Sparkles, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { label: "Overview", href: "/app", icon: LayoutDashboard },
  { label: "Products", href: "/app/products", icon: Package },
  { label: "Generate", href: "/app/generate", icon: Sparkles, highlight: true },
  { label: "Generations", href: "/app/generations", icon: GalleryVerticalEnd },
  { label: "Posters", href: "/app/posters", icon: ImagePlus },
]

export function StudioShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const sidebar = <aside className="flex h-full w-[248px] shrink-0 flex-col border-r border-border bg-white px-4 py-5">
    <div className="flex items-center gap-3 px-2 pb-8">
      <div className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm"><Sparkles data-icon="inline-start" /></div>
      <div><p className="font-display text-lg font-bold tracking-tight">VastrAI</p><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Studio</p></div>
    </div>
    <nav aria-label="Main navigation" className="flex flex-1 flex-col gap-1">
      <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Workspace</p>
      {navigation.map((item) => { const active = item.href === "/app" ? pathname === item.href : pathname.startsWith(item.href); const Icon = item.icon; return <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={cn("flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors", active ? "bg-[#f5e9dc] text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground")}><Icon data-icon="inline-start" /><span>{item.label}</span>{item.highlight && <span className="ml-auto rounded-full bg-[#f4dfb4] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#765523]">AI</span>}</Link> })}
      <p className="mt-8 px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Manage</p>
      <Link href="/admin" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"><BarChart3 data-icon="inline-start" />Admin</Link>
      <Link href="/settings" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"><Settings data-icon="inline-start" />Settings</Link>
    </nav>
    <div className="rounded-2xl bg-[#fbf2e7] p-4"><div className="mb-3 flex size-9 items-center justify-center rounded-full bg-[#e9cda9] text-sm font-bold text-[#754832]">VS</div><p className="text-sm font-bold">Need inspiration?</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">Turn your latest saree into a campaign.</p><Link href="/app/generate" className="mt-3 inline-flex text-xs font-bold text-primary">Start creating <span aria-hidden="true" className="ml-1">→</span></Link></div>
  </aside>
  return <div className="min-h-screen bg-background md:flex"><div className="hidden md:block">{sidebar}</div>{mobileOpen && <div className="fixed inset-0 z-40 bg-foreground/25 md:hidden" onClick={() => setMobileOpen(false)} aria-hidden="true" />}<div className={cn("fixed inset-y-0 left-0 z-50 transition-transform md:hidden", mobileOpen ? "translate-x-0" : "-translate-x-full")}>{sidebar}</div><div className="min-w-0 flex-1"><header className="flex h-[72px] items-center justify-between border-b border-border bg-white/80 px-4 backdrop-blur md:px-8"><button className="rounded-lg p-2 md:hidden" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu /></button><div className="hidden items-center gap-2 text-sm text-muted-foreground md:flex"><FolderOpen data-icon="inline-start" /> Workspace <span>/</span> <span className="font-semibold text-foreground">{pathname === "/app" ? "Overview" : "Studio"}</span></div><div className="ml-auto flex items-center gap-4"><button aria-label="Account menu" className="flex items-center gap-2 rounded-full border border-border bg-white py-1.5 pl-1.5 pr-3 text-left"><span className="grid size-8 place-items-center rounded-full bg-[#e9cda9] text-xs font-bold text-[#754832]">VS</span><span className="hidden text-xs font-semibold sm:block">VastrAI Shop</span><ChevronDown className="hidden sm:block" /></button></div></header><main className="mx-auto max-w-[1400px] px-4 py-7 md:px-8 md:py-10">{children}</main></div></div>
}
