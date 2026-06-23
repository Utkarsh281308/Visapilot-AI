import Link from "next/link"
import { Plane } from "lucide-react"
import { navLinks } from "@/lib/data"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Plane className="h-4 w-4" />
              </span>
              <span className="font-semibold">
                VisaPilot<span className="text-primary"> AI</span>
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              AI-powered visa guidance built for Indian travelers, students, and
              professionals. Find the right route, prepare with confidence, and
              track every step.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-12 gap-y-2">
            <nav className="flex flex-col gap-2">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="mt-10 border-t border-border/70 pt-6 text-xs text-muted-foreground">
          {"© 2026 VisaPilot AI. Guidance only — not a substitute for official immigration advice."}
        </div>
      </div>
    </footer>
  )
}
