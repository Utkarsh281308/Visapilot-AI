import Link from "next/link"
import {
  FileStack,
  Clock3,
  CheckCircle2,
  Circle,
  CalendarDays,
  Hash,
  Plus,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { PageShell } from "@/components/page-shell"
import { applications, riskColor } from "@/lib/data"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  const active = applications.length
  const avgProgress = Math.round(
    applications.reduce((s, a) => s + a.progress, 0) / applications.length,
  )
  const nearDecision = applications.filter((a) => a.progress >= 80).length

  const summary = [
    {
      label: "Active applications",
      value: active,
      icon: FileStack,
      tint: "text-primary bg-primary/10",
    },
    {
      label: "Average progress",
      value: `${avgProgress}%`,
      icon: TrendingUp,
      tint: "text-chart-2 bg-chart-2/10",
    },
    {
      label: "Near decision",
      value: nearDecision,
      icon: Clock3,
      tint: "text-chart-3 bg-chart-3/10",
    },
  ]

  return (
    <PageShell
      title="Application dashboard"
      description="Track the status and progress of every visa application in one place."
      action={
        <Button render={<Link href="/recommendations" />} className="gap-2">
          <Plus className="h-4 w-4" />
          New application
        </Button>
      }
    >
      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {summary.map((s) => (
          <Card key={s.label} className="border-border/70">
            <CardContent className="flex items-center gap-4 p-5">
              <span
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-lg",
                  s.tint,
                )}
              >
                <s.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Applications */}
      <div className="mt-8 flex flex-col gap-6">
        {applications.map((app) => (
          <Card key={app.id} className="border-border/70">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 border-b border-border/70 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{app.flag}</span>
                  <div>
                    <h3 className="font-semibold">
                      {app.country} — {app.visaType}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Hash className="h-3.5 w-3.5" />
                        {app.reference}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        Submitted {app.submitted}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={cn(riskColor(app.risk))}>
                    {app.risk} risk
                  </Badge>
                  <Badge variant="secondary">{app.status}</Badge>
                </div>
              </div>

              <div className="grid gap-6 pt-5 lg:grid-cols-5">
                {/* Progress */}
                <div className="lg:col-span-2">
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold">{app.progress}%</span>
                  </div>
                  <Progress value={app.progress} />
                  <p className="mt-3 text-sm text-muted-foreground">
                    Estimated decision:{" "}
                    <span className="font-medium text-foreground">
                      {app.estimatedDecision}
                    </span>
                  </p>
                </div>

                {/* Timeline */}
                <ol className="lg:col-span-3">
                  {app.stages.map((stage, i) => {
                    const last = i === app.stages.length - 1
                    return (
                      <li key={stage.name} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          {stage.status === "completed" ? (
                            <CheckCircle2 className="h-5 w-5 text-chart-2" />
                          ) : stage.status === "current" ? (
                            <span className="flex h-5 w-5 items-center justify-center">
                              <span className="h-3 w-3 animate-pulse rounded-full bg-primary ring-4 ring-primary/20" />
                            </span>
                          ) : (
                            <Circle className="h-5 w-5 text-border" />
                          )}
                          {!last && (
                            <span
                              className={cn(
                                "my-0.5 w-px flex-1",
                                stage.status === "completed"
                                  ? "bg-chart-2/40"
                                  : "bg-border",
                              )}
                            />
                          )}
                        </div>
                        <div className={cn("pb-4", last && "pb-0")}>
                          <p
                            className={cn(
                              "text-sm font-medium",
                              stage.status === "upcoming" &&
                                "text-muted-foreground",
                            )}
                          >
                            {stage.name}
                          </p>
                          {stage.date && (
                            <p className="text-xs text-muted-foreground">
                              {stage.date}
                            </p>
                          )}
                        </div>
                      </li>
                    )
                  })}
                </ol>
              </div>

              <div className="mt-2 flex flex-wrap gap-2 border-t border-border/70 pt-4">
                <Button
                  render={<Link href="/checklist" />}
                  variant="outline"
                  size="sm"
                >
                  View documents
                </Button>
                <Button
                  render={<Link href="/chat" />}
                  variant="ghost"
                  size="sm"
                >
                  Ask the assistant
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  )
}
