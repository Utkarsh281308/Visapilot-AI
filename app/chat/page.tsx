"use client"

import { useEffect, useRef, useState } from "react"
import { Send, Plane, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { SiteHeader } from "@/components/site-header"
import { cn } from "@/lib/utils"

type Message = { id: number; role: "user" | "bot"; text: string }

const suggestions = [
  "Which visa is best for me as a software engineer?",
  "What documents do I need for Canada Express Entry?",
  "How long does an Australia PR take?",
  "What's my approval risk for a UK Skilled Worker visa?",
]

const cannedReplies: { match: string[]; reply: string }[] = [
  {
    match: ["software", "engineer", "best", "which visa"],
    reply:
      "For software engineers from India, Canada's Express Entry (PR) is usually the strongest fit — your occupation is in high demand and tech CRS scores are competitive. Australia's Subclass 189 and Germany's Opportunity Card are solid alternatives. Run the eligibility check to see your exact match scores.",
  },
  {
    match: ["document", "canada", "express entry"],
    reply:
      "For Canada Express Entry you'll typically need: a valid passport, IELTS/PTE language results, an ECA (WES) for your degree, work experience letters, proof of funds (~₹12–15 lakh), and a police clearance certificate. I've prepared a full checklist on your Checklist page.",
  },
  {
    match: ["australia", "how long", "pr", "time"],
    reply:
      "Australia's Subclass 189 PR generally takes 8–12 months end to end: skills assessment (2–3 months), EOI + invitation, then visa processing. Submitting a complete, error-free application is the biggest factor in avoiding delays.",
  },
  {
    match: ["approval", "risk", "uk", "skilled worker"],
    reply:
      "The UK Skilled Worker visa carries a Moderate approval risk for most applicants — the key requirement is a job offer from a licensed sponsor meeting the salary threshold. With a confirmed CoS, approval rates are around 76%. Want me to outline how to strengthen your case?",
  },
]

function getReply(text: string): string {
  const lower = text.toLowerCase()
  const found = cannedReplies.find((c) =>
    c.match.some((m) => lower.includes(m)),
  )
  if (found) return found.reply
  return "Great question! Based on your profile, I'd recommend starting with the eligibility check so I can give you precise, personalized guidance. In general, I can help you compare visa routes, build document checklists, estimate approval odds, and track your application. What would you like to dive into?"
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "bot",
      text: "Hi! I'm Pilot, your AI visa assistant. Ask me anything about visa options, eligibility, documents, or timelines for your move abroad.",
    },
  ])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages, typing])

  const send = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const userMsg: Message = { id: Date.now(), role: "user", text: trimmed }
    setMessages((m) => [...m, userMsg])
    setInput("")
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, role: "bot", text: getReply(trimmed) },
      ])
    }, 1100)
  }

  return (
    <div className="flex h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col overflow-hidden px-4 py-4 sm:px-6">
        {/* Chat header */}
        <div className="mb-4 flex items-center gap-3 rounded-xl border border-border/70 bg-card p-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Plane className="h-5 w-5" />
          </span>
          <div>
            <p className="flex items-center gap-1.5 font-semibold">
              Pilot
              <Sparkles className="h-3.5 w-3.5 text-primary" />
            </p>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-chart-2" />
              Online · AI visa assistant
            </p>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 space-y-4 overflow-y-auto rounded-xl"
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "flex items-end gap-2",
                m.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              {m.role === "bot" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Plane className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              <Card
                className={cn(
                  "max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-none",
                  m.role === "user"
                    ? "rounded-br-sm bg-primary text-primary-foreground"
                    : "rounded-bl-sm border-border/70 bg-card",
                )}
              >
                {m.text}
              </Card>
            </div>
          ))}

          {typing && (
            <div className="flex items-end gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Plane className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <Card className="rounded-2xl rounded-bl-sm border-border/70 bg-card px-4 py-3 shadow-none">
                <span className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </span>
              </Card>
            </div>
          )}
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="my-3 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border border-border/70 bg-card px-3 py-1.5 text-left text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            send(input)
          }}
          className="mt-3 flex items-center gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about visas, documents, eligibility…"
            className="h-11"
          />
          <Button
            type="submit"
            size="icon"
            className="h-11 w-11 shrink-0"
            disabled={!input.trim()}
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Pilot provides general guidance and may be inaccurate. Verify with
          official sources.
        </p>
      </main>
    </div>
  )
}
