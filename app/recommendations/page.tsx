"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Clock,
  Wallet,
  CalendarCheck,
  TrendingUp,
  Sparkles,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { PageShell } from "@/components/page-shell"
import { visaRecommendations, riskColor } from "@/lib/data"
import { cn } from "@/lib/utils"

type EligibilityResult = {
  recommended_visa: string
  destination_country: string
  eligibility_score: number
  approval_probability: number
  risk_level: string
  summary: string
  recommended_documents: string[]
}

export default function RecommendationsPage() {
  const [result, setResult] = useState<EligibilityResult | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("eligibilityResult")
    if (stored) {
      setResult(JSON.parse(stored))
    }
  }, [])

  const sorted = [...visaRecommendations].sort(
    (a, b) => b.matchScore - a.matchScore,
  )
  const top = sorted[0]

  return (
    <PageShell
      title="Your AI visa recommendations"
      description="Based on your profile, here are the best-matched visa routes ranked by fit and approval likelihood."
      action={
        <Button render={<Link href="/eligibility" />} variant="outline">
          Edit my profile
        </Button>
      }
    >
      {result && (
        <Card className="mb-8 overflow-hidden border-primary/30 bg-primary/5">
          <CardContent className="p-6">
            <Badge className="mb-3 gap-1.5 bg-primary text-primary-foreground">
              <Sparkles className="h-3.5 w-3.5" />
              Live backend result
            </Badge>

            <h2 className="text-2xl font-bold">
              {result.destination_country} — {result.recommended_visa}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              {result.summary}
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border bg-card p-4">
                <p className="text-sm text-muted-foreground">
                  Eligibility Score
                </p>
                <p className="text-3xl font-bold text-primary">
                  {result.eligibility_score}%
                </p>
                <Progress value={result.eligibility_score} className="mt-2" />
              </div>

              <div className="rounded-lg border bg-card p-4">
                <p className="text-sm text-muted-foreground">
                  Approval Probability
                </p>
                <p className="text-3xl font-bold text-chart-2">
                  {result.approval_probability}%
                </p>
                <Progress value={result.approval_probability} className="mt-2" />
              </div>

              <div className="rounded-lg border bg-card p-4">
                <p className="text-sm text-muted-foreground">Risk Level</p>
                <p className="text-3xl font-bold">{result.risk_level}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold">Recommended Documents</h3>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {result.recommended_documents.map((doc) => (
                  <div
                    key={doc}
                    className="flex items-center gap-2 rounded-lg border bg-card p-3 text-sm"
                  >
                    <CheckCircle2 className="h-4 w-4 text-chart-2" />
                    {doc}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <Button render={<Link href="/checklist" />} variant="outline">
                View checklist
              </Button>
              <Button render={<Link href="/dashboard" />} className="gap-2">
                Start application
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {!result && (
        <Card className="mb-8 overflow-hidden border-primary/30 bg-primary/5">
          <CardContent className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <span className="text-4xl">{top.flag}</span>
              <div>
                <Badge className="mb-2 gap-1.5 bg-primary text-primary-foreground">
                  <Sparkles className="h-3.5 w-3.5" />
                  Demo recommendation
                </Badge>
                <h2 className="text-xl font-bold">
                  {top.country} — {top.visaType}
                </h2>
                <p className="text-sm text-muted-foreground">{top.purpose}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <h3 className="mb-4 text-lg font-semibold">
        Other strong options ({sorted.length - 1})
      </h3>

      <div className="grid gap-6 lg:grid-cols-2">
        {sorted.slice(1).map((v) => (
          <Card key={v.id} className="border-border/70">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{v.flag}</span>
                  <div>
                    <h4 className="font-semibold">{v.visaType}</h4>
                    <p className="text-sm text-muted-foreground">
                      {v.country} · {v.purpose}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className={cn("gap-1", riskColor(v.risk))}>
                  {v.risk} risk
                </Badge>
              </div>

              <div className="mt-5 grid gap-4">
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <TrendingUp className="h-4 w-4" />
                      Match score
                    </span>
                    <span className="font-semibold">{v.matchScore}%</span>
                  </div>
                  <Progress value={v.matchScore} />
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4" />
                      Approval likelihood
                    </span>
                    <span className="font-semibold">{v.approvalRate}%</span>
                  </div>
                  <Progress value={v.approvalRate} />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border/70 pt-4 text-sm">
                <div>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> Time
                  </p>
                  <p className="mt-0.5 font-medium">{v.processingTime}</p>
                </div>
                <div>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Wallet className="h-3.5 w-3.5" /> Cost
                  </p>
                  <p className="mt-0.5 font-medium">{v.cost}</p>
                </div>
                <div>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <CalendarCheck className="h-3.5 w-3.5" /> Validity
                  </p>
                  <p className="mt-0.5 font-medium">{v.validity}</p>
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                <Button
                  render={<Link href="/checklist" />}
                  variant="outline"
                  className="flex-1"
                >
                  View checklist
                </Button>
                <Button
                  render={<Link href="/dashboard" />}
                  className="flex-1 gap-2"
                >
                  Apply
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  )
}