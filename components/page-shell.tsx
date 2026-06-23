import type { ReactNode } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export function PageShell({
  title,
  description,
  children,
  action,
}: {
  title: string
  description?: string
  children: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="border-b border-border/70 bg-secondary/30">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
            <div>
              <h1 className="text-balance text-2xl font-bold tracking-tight sm:text-3xl">
                {title}
              </h1>
              {description && (
                <p className="mt-2 max-w-2xl text-pretty text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
