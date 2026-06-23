"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ArrowRight, ArrowLeft, Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PageShell } from "@/components/page-shell"
import { cn } from "@/lib/utils"

const steps = [
  { id: "goal", title: "Your goal" },
  { id: "profile", title: "Profile" },
  { id: "background", title: "Background" },
]

const purposes = [
  "Skilled migration / PR",
  "Study abroad",
  "Work visa",
  "Visit / tourism",
  "Business / investment",
]

const regions = [
  "Canada",
  "Australia",
  "United Kingdom",
  "United States",
  "Germany / Europe",
  "Not sure yet",
]

export default function EligibilityPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    purpose: "",
    destination: "",
    age: "",
    education: "",
    experience: "",
    english: "",
    funds: "",
    occupation: "",
  })

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const canContinue =
    step === 0
      ? form.purpose && form.destination
      : step === 1
        ? form.age && form.education && form.experience
        : form.english && form.funds

  const progress = ((step + 1) / steps.length) * 100

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep((s) => s + 1)
      return
    }
    setLoading(true)
    setTimeout(() => {
      toast.success("Analysis complete — here are your matches!")
      router.push("/recommendations")
    }, 1600)
  }

  return (
    <PageShell
      title="Visa eligibility check"
      description="Answer a few questions and our AI will assess which visa routes fit you best. Takes about 2 minutes."
    >
      <div className="mx-auto max-w-2xl">
        {/* Stepper */}
        <div className="mb-6">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="font-medium">
              Step {step + 1} of {steps.length}: {steps[step].title}
            </span>
            <span className="text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} />
        </div>

        <Card className="border-border/70">
          <CardContent className="p-6">
            {step === 0 && (
              <div className="grid gap-5">
                <div className="grid gap-2">
                  <Label>What is your main goal?</Label>
                  <Select
                    value={form.purpose}
                    onValueChange={(v) => set("purpose", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      {purposes.map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Preferred destination</Label>
                  <Select
                    value={form.destination}
                    onValueChange={(v) => set("destination", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="occupation">Current occupation (optional)</Label>
                  <Input
                    id="occupation"
                    placeholder="e.g. Software Engineer"
                    value={form.occupation}
                    onChange={(e) => set("occupation", e.target.value)}
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="e.g. 29"
                    value={form.age}
                    onChange={(e) => set("age", e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Highest education</Label>
                  <Select
                    value={form.education}
                    onValueChange={(v) => set("education", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "High school",
                        "Diploma",
                        "Bachelor's degree",
                        "Master's degree",
                        "Doctorate (PhD)",
                      ].map((e) => (
                        <SelectItem key={e} value={e}>
                          {e}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Years of work experience</Label>
                  <Select
                    value={form.experience}
                    onValueChange={(v) => set("experience", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      {["0–1 years", "2–3 years", "4–6 years", "7+ years"].map(
                        (e) => (
                          <SelectItem key={e} value={e}>
                            {e}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-5">
                <div className="grid gap-2">
                  <Label>English proficiency (IELTS band)</Label>
                  <Select
                    value={form.english}
                    onValueChange={(v) => set("english", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select band score" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Below 6.0",
                        "6.0 – 6.5",
                        "7.0 – 7.5",
                        "8.0+",
                        "Not taken yet",
                      ].map((e) => (
                        <SelectItem key={e} value={e}>
                          {e}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Available settlement funds</Label>
                  <Select
                    value={form.funds}
                    onValueChange={(v) => set("funds", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select fund range" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Under ₹5 lakh",
                        "₹5 – 15 lakh",
                        "₹15 – 30 lakh",
                        "₹30 lakh+",
                      ].map((e) => (
                        <SelectItem key={e} value={e}>
                          {e}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2 font-medium text-foreground">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Almost there
                  </span>
                  <p className="mt-1">
                    We will analyze your profile against live eligibility
                    criteria for 50+ visa programs.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between gap-3">
              <Button
                variant="ghost"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0 || loading}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!canContinue || loading}
                className="gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing…
                  </>
                ) : step === steps.length - 1 ? (
                  <>
                    Get recommendations
                    <Sparkles className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 flex justify-center gap-2">
          {steps.map((s, i) => (
            <span
              key={s.id}
              className={cn(
                "h-1.5 w-8 rounded-full transition-colors",
                i <= step ? "bg-primary" : "bg-border",
              )}
            />
          ))}
        </div>
      </div>
    </PageShell>
  )
}
