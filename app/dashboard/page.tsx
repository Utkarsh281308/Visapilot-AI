"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  FileStack,
  Hash,
  Loader2,
  Plus,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { PageShell } from "@/components/page-shell"
import { cn } from "@/lib/utils"

const API_BASE_URL = "http://127.0.0.1:8000"
const DEMO_APPLICATION_ID = "demo-application"

type EligibilityResult = {
  destination_country?: string
  recommended_visa?: string
  risk_level?: string
}

type TrackingStage = {
  stage: string
  description: string
  completed: boolean
}

type TrackingResult = {
  application_id: string
  current_status: string
  progress_percentage: number
  timeline: TrackingStage[]
}

function riskClass(risk?: string) {
  switch (risk?.toLowerCase()) {
    case "low":
      return "bg-chart-2/15 text-chart-2 border-chart-2/30"
    case "medium":
    case "moderate":
      return "bg-chart-3/15 text-chart-3 border-chart-3/30"
    case "high":
      return "bg-destructive/15 text-destructive border-destructive/30"
    default:
      return "bg-secondary text-secondary-foreground border-border"
  }
}

export default function DashboardPage() {
  const [eligibility, setEligibility] = useState<EligibilityResult | null>(null)
  const [tracking, setTracking] = useState<TrackingResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("eligibilityResult")
    if (stored) {
      try {
        setEligibility(JSON.parse(stored))
      } catch {
        localStorage.removeItem("eligibilityResult")
      }
    }

    async function loadTracking() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          `${API_BASE_URL}/applications/${DEMO_APPLICATION_ID}/tracking`,
        )

        if (!response.ok) {
          throw new Error("Tracking request failed")
        }

        setTracking(await response.json())
      } catch {
        setError("Could not load tracking data from the backend.")
      } finally {
        setLoading(false)
      }
    }

    loadTracking()
  }, [])

  const summary = useMemo(
    () => [
      {
        label: "Active applications",
        value: tracking ? 1 : 0,
        icon: FileStack,
        tint: "text-primary bg-primary/10",
      },
      {
        label: "Application progress",
        value: `${tracking?.progress_percentage ?? 0}%`,
        icon: TrendingUp,
        tint: "text-chart-2 bg-chart-2/10",
      },
      {
        label: "Current status",
        value: tracking?.current_status ?? "Pending",
        icon: Clock3,
        tint: "text-chart-3 bg-chart-3/10",
      },
    ],
    [tracking],
  )

  const country = eligibility?.destination_country ?? "Selected destination"
  const visaType = eligibility?.recommended_visa ?? "Recommended visa route"
  const risk = eligibility?.risk_level ?? "Demo"

  return (
    <PageShell
      title="Application dashboard"
      description="Track the status and progress of your visa application from the FastAPI backend."
      action={
        <Button render={<Link href="/recommendations" />} className="gap-2">
          <Plus className="h-4 w-4" />
          New application
        </Button>
      }
    >
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

      <div className="mt-8">
        {loading && (
          <Card className="border-border/70">
            <CardContent className="flex items-center gap-3 p-6 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading application tracking...
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="flex items-start gap-3 p-6 text-sm">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
              <div>
                <p className="font-medium text-destructive">{error}</p>
                <p className="mt-1 text-muted-foreground">
                  Start FastAPI on port 8000, then refresh this page.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {tracking && (
          <Card className="border-border/70">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 border-b border-border/70 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">✈️</span>
                  <div>
                    <h3 className="font-semibold">
                      {country} - {visaType}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Hash className="h-3.5 w-3.5" />
                        {tracking.application_id}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        Demo tracking from FastAPI
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={cn(riskClass(risk))}>
                    {risk} risk
                  </Badge>
                  <Badge variant="secondary">{tracking.current_status}</Badge>
                </div>
              </div>

              <div className="grid gap-6 pt-5 lg:grid-cols-5">
                <div className="lg:col-span-2">
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold">
                      {tracking.progress_percentage}%
                    </span>
                  </div>
                  <Progress value={tracking.progress_percentage} />
                  <p className="mt-3 text-sm text-muted-foreground">
                    Current status:{" "}
                    <span className="font-medium text-foreground">
                      {tracking.current_status}
                    </span>
                  </p>
                </div>

                <ol className="lg:col-span-3">
                  {tracking.timeline.map((stage, i) => {
                    const last = i === tracking.timeline.length - 1
                    const current = stage.stage === tracking.current_status
                    return (
                      <li key={stage.stage} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          {current ? (
                            <span className="flex h-5 w-5 items-center justify-center">
                              <span className="h-3 w-3 animate-pulse rounded-full bg-primary ring-4 ring-primary/20" />
                            </span>
                          ) : stage.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-chart-2" />
                          ) : (
                            <Circle className="h-5 w-5 text-border" />
                          )}
                          {!last && (
                            <span
                              className={cn(
                                "my-0.5 w-px flex-1",
                                stage.completed ? "bg-chart-2/40" : "bg-border",
                              )}
                            />
                          )}
                        </div>
                        <div className={cn("pb-4", last && "pb-0")}>
                          <p
                            className={cn(
                              "text-sm font-medium",
                              !stage.completed && !current && "text-muted-foreground",
                            )}
                          >
                            {stage.stage}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {stage.description}
                          </p>
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
                <Button render={<Link href="/chat" />} variant="ghost" size="sm">
                  Ask the assistant
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageShell>
  )
}
