"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { Download, FileText, ArrowRight, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { PageShell } from "@/components/page-shell"
import { documentChecklist, type ChecklistItem } from "@/lib/data"
import { cn } from "@/lib/utils"

export default function ChecklistPage() {
  const [items, setItems] = useState<ChecklistItem[]>(documentChecklist)

  const toggle = (id: string) =>
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it)),
    )

  const { done, total, requiredLeft, percent, byCategory } = useMemo(() => {
    const done = items.filter((i) => i.done).length
    const total = items.length
    const requiredLeft = items.filter((i) => i.required && !i.done).length
    const percent = Math.round((done / total) * 100)
    const byCategory = items.reduce<Record<string, ChecklistItem[]>>(
      (acc, it) => {
        acc[it.category] = acc[it.category] || []
        acc[it.category].push(it)
        return acc
      },
      {},
    )
    return { done, total, requiredLeft, percent, byCategory }
  }, [items])

  return (
    <PageShell
      title="Document checklist"
      description="A personalized checklist for Canada Express Entry (PR). Check items off as you collect them."
      action={
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => toast.success("Checklist exported as PDF")}
        >
          <Download className="h-4 w-4" />
          Export PDF
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Progress sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20 border-border/70">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">Overall progress</p>
              <p className="mt-1 text-3xl font-bold">
                {percent}
                <span className="text-lg text-muted-foreground">%</span>
              </p>
              <Progress value={percent} className="mt-3" />
              <p className="mt-2 text-sm text-muted-foreground">
                {done} of {total} documents ready
              </p>

              <div
                className={cn(
                  "mt-5 flex items-start gap-2 rounded-lg border p-3 text-sm",
                  requiredLeft > 0
                    ? "border-chart-3/30 bg-chart-3/10"
                    : "border-chart-2/30 bg-chart-2/10",
                )}
              >
                <AlertCircle
                  className={cn(
                    "mt-0.5 h-4 w-4 shrink-0",
                    requiredLeft > 0 ? "text-chart-3" : "text-chart-2",
                  )}
                />
                <span className="text-muted-foreground">
                  {requiredLeft > 0
                    ? `${requiredLeft} required document${requiredLeft > 1 ? "s" : ""} still pending.`
                    : "All required documents are ready to submit!"}
                </span>
              </div>

              <Button
                render={<Link href="/dashboard" />}
                className="mt-5 w-full gap-2"
                disabled={requiredLeft > 0}
              >
                Continue to application
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Checklist by category */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {Object.entries(byCategory).map(([category, list]) => (
            <Card key={category} className="border-border/70">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold">{category}</h3>
                  <Badge variant="secondary" className="ml-auto">
                    {list.filter((i) => i.done).length}/{list.length}
                  </Badge>
                </div>
                <ul className="flex flex-col gap-3">
                  {list.map((item) => (
                    <li
                      key={item.id}
                      className={cn(
                        "flex items-start gap-3 rounded-lg border p-3 transition-colors",
                        item.done
                          ? "border-chart-2/30 bg-chart-2/5"
                          : "border-border/70",
                      )}
                    >
                      <Checkbox
                        id={item.id}
                        checked={item.done}
                        onCheckedChange={() => toggle(item.id)}
                        className="mt-0.5"
                      />
                      <label
                        htmlFor={item.id}
                        className="flex-1 cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={cn(
                              "font-medium",
                              item.done && "text-muted-foreground line-through",
                            )}
                          >
                            {item.label}
                          </span>
                          {item.required ? (
                            <Badge
                              variant="outline"
                              className="border-destructive/30 bg-destructive/10 text-destructive"
                            >
                              Required
                            </Badge>
                          ) : (
                            <Badge variant="outline">Optional</Badge>
                          )}
                        </span>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </label>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
