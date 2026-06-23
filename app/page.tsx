import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  ListChecks,
  Gauge,
  Compass,
  MessageSquare,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const features = [
  {
    icon: Compass,
    title: "Smart Visa Matching",
    desc: "Tell us your profile and goals. Our AI ranks the visa routes that fit you best across 50+ countries.",
  },
  {
    icon: Gauge,
    title: "Approval Risk Score",
    desc: "See a clear, data-driven approval probability for each option before you spend a rupee on fees.",
  },
  {
    icon: ListChecks,
    title: "Document Checklists",
    desc: "Auto-generated, country-specific checklists so you never miss a required document again.",
  },
  {
    icon: ShieldCheck,
    title: "Eligibility Engine",
    desc: "Instant points-based eligibility checks for skilled migration, study, work, and visit visas.",
  },
  {
    icon: MessageSquare,
    title: "24/7 AI Assistant",
    desc: "Ask anything about visas, timelines, or paperwork and get instant, India-aware answers.",
  },
  {
    icon: Sparkles,
    title: "Live Application Tracking",
    desc: "Track every application stage with progress bars and estimated decision dates in one dashboard.",
  },
]

const steps = [
  {
    n: "01",
    title: "Share your profile",
    desc: "Answer a short eligibility form — education, experience, funds, and goals.",
  },
  {
    n: "02",
    title: "Get AI recommendations",
    desc: "Receive ranked visa options with match scores and approval risk.",
  },
  {
    n: "03",
    title: "Prepare & track",
    desc: "Generate your checklist and monitor progress until decision day.",
  },
]

const stats = [
  { value: "50+", label: "Countries covered" },
  { value: "1.2L+", label: "Indians guided" },
  { value: "92%", label: "Checklist accuracy" },
  { value: "4.8/5", label: "Average rating" },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:py-24 lg:px-8">
            <div>
              <Badge
                variant="outline"
                className="mb-5 gap-1.5 border-primary/30 bg-primary/10 text-primary"
              >
                <Sparkles className="h-3.5 w-3.5" />
                AI-powered visa guidance for India
              </Badge>
              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Find your best visa, the smart way.
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
                VisaPilot AI matches you to the right visa, scores your approval
                odds, builds your document checklist, and tracks your
                application — all in one place.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  render={<Link href="/eligibility" />}
                  size="lg"
                  className="gap-2"
                >
                  Check my eligibility
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  render={<Link href="/recommendations" />}
                  size="lg"
                  variant="outline"
                >
                  See visa options
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-chart-2" />
                  No credit card needed
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-chart-2" />
                  Results in 2 minutes
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary/5 blur-2xl" />
              <Card className="overflow-hidden border-border/70 p-0 shadow-xl">
                <div className="relative aspect-[4/3] w-full bg-secondary/40">
                  <Image
                    src="/hero-globe.png"
                    alt="Global visa routes from India illustrated on a world map"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
                <CardContent className="grid grid-cols-2 gap-3 p-4">
                  <div className="rounded-lg border border-border/70 bg-card p-3">
                    <p className="text-xs text-muted-foreground">Top match</p>
                    <p className="mt-1 font-semibold">{"🇨🇦 Canada Express Entry"}</p>
                    <p className="text-sm font-medium text-chart-2">94% match</p>
                  </div>
                  <div className="rounded-lg border border-border/70 bg-card p-3">
                    <p className="text-xs text-muted-foreground">Approval risk</p>
                    <p className="mt-1 font-semibold">Low risk</p>
                    <p className="text-sm font-medium text-primary">88% approval</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-border/70 bg-secondary/30">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold tracking-tight text-primary">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to land your visa
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              From first eligibility check to final approval, VisaPilot AI
              guides every step so nothing slips through the cracks.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card
                key={f.title}
                className="border-border/70 transition-shadow hover:shadow-md"
              >
                <CardContent className="p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {f.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="border-y border-border/70 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                Three steps to clarity
              </h2>
              <p className="mt-4 text-muted-foreground">
                No jargon, no guesswork. Just a clear path forward.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {steps.map((s) => (
                <Card key={s.n} className="relative border-border/70">
                  <CardContent className="p-6">
                    <span className="text-4xl font-bold text-primary/30">
                      {s.n}
                    </span>
                    <h3 className="mt-3 font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {s.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24 lg:px-8">
          <Card className="overflow-hidden border-none bg-sidebar text-sidebar-foreground">
            <CardContent className="flex flex-col items-center gap-6 px-6 py-12 text-center lg:px-12">
              <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to discover your best visa route?
              </h2>
              <p className="max-w-xl text-pretty text-sidebar-foreground/70">
                Take the 2-minute eligibility check and get personalized AI
                recommendations instantly. It is free to start.
              </p>
              <Button
                render={<Link href="/eligibility" />}
                size="lg"
                className="gap-2"
              >
                Start free eligibility check
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
