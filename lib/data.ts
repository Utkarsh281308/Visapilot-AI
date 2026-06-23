export type RiskLevel = "Low" | "Moderate" | "High"

export type VisaRecommendation = {
  id: string
  country: string
  flag: string
  visaType: string
  purpose: string
  matchScore: number
  approvalRate: number
  risk: RiskLevel
  processingTime: string
  cost: string
  validity: string
  highlights: string[]
}

export const visaRecommendations: VisaRecommendation[] = [
  {
    id: "ca-express",
    country: "Canada",
    flag: "🇨🇦",
    visaType: "Express Entry (PR)",
    purpose: "Skilled Worker Immigration",
    matchScore: 94,
    approvalRate: 88,
    risk: "Low",
    processingTime: "6–8 months",
    cost: "₹1,25,000",
    validity: "Permanent Residency",
    highlights: ["High CRS score match", "In-demand occupation", "Strong English score"],
  },
  {
    id: "au-189",
    country: "Australia",
    flag: "🇦🇺",
    visaType: "Subclass 189 (PR)",
    purpose: "Skilled Independent Visa",
    matchScore: 89,
    approvalRate: 82,
    risk: "Low",
    processingTime: "8–12 months",
    cost: "₹2,10,000",
    validity: "Permanent Residency",
    highlights: ["Points test cleared", "Skill assessment eligible", "Age advantage"],
  },
  {
    id: "uk-skilled",
    country: "United Kingdom",
    flag: "🇬🇧",
    visaType: "Skilled Worker Visa",
    purpose: "Employer-Sponsored Work",
    matchScore: 81,
    approvalRate: 76,
    risk: "Moderate",
    processingTime: "3–8 weeks",
    cost: "₹1,60,000",
    validity: "Up to 5 years",
    highlights: ["Job offer required", "Salary threshold met", "Healthcare surcharge applies"],
  },
  {
    id: "us-h1b",
    country: "United States",
    flag: "🇺🇸",
    visaType: "H-1B Work Visa",
    purpose: "Specialty Occupation",
    matchScore: 68,
    approvalRate: 54,
    risk: "High",
    processingTime: "4–8 months",
    cost: "₹2,80,000",
    validity: "Up to 6 years",
    highlights: ["Lottery-based selection", "Employer petition needed", "Degree match strong"],
  },
  {
    id: "de-opportunity",
    country: "Germany",
    flag: "🇩🇪",
    visaType: "Opportunity Card",
    purpose: "Job Seeker Visa",
    matchScore: 84,
    approvalRate: 79,
    risk: "Moderate",
    processingTime: "1–3 months",
    cost: "₹95,000",
    validity: "1 year (renewable)",
    highlights: ["Points-based entry", "No job offer needed", "Basic German helps"],
  },
]

export type ChecklistItem = {
  id: string
  label: string
  description: string
  required: boolean
  done: boolean
  category: string
}

export const documentChecklist: ChecklistItem[] = [
  {
    id: "passport",
    label: "Valid Passport",
    description: "Must be valid for at least 6 months with 2 blank pages.",
    required: true,
    done: true,
    category: "Identity",
  },
  {
    id: "photo",
    label: "Passport-size Photographs",
    description: "Recent photos meeting destination biometric specs.",
    required: true,
    done: true,
    category: "Identity",
  },
  {
    id: "ielts",
    label: "Language Test Score (IELTS)",
    description: "Valid IELTS / PTE result within the last 2 years.",
    required: true,
    done: false,
    category: "Eligibility",
  },
  {
    id: "eca",
    label: "Educational Credential Assessment",
    description: "WES or equivalent assessment of your degrees.",
    required: true,
    done: false,
    category: "Eligibility",
  },
  {
    id: "experience",
    label: "Work Experience Letters",
    description: "Reference letters on company letterhead with roles & dates.",
    required: true,
    done: true,
    category: "Employment",
  },
  {
    id: "funds",
    label: "Proof of Funds",
    description: "Bank statements showing settlement funds (6 months).",
    required: true,
    done: false,
    category: "Financial",
  },
  {
    id: "police",
    label: "Police Clearance Certificate",
    description: "PCC from all countries lived in for 6+ months.",
    required: true,
    done: false,
    category: "Background",
  },
  {
    id: "medical",
    label: "Medical Examination",
    description: "Completed by an approved panel physician.",
    required: false,
    done: false,
    category: "Background",
  },
  {
    id: "sop",
    label: "Statement of Purpose",
    description: "Optional but strengthens skilled migration profiles.",
    required: false,
    done: false,
    category: "Supporting",
  },
]

export type ApplicationStage = {
  name: string
  status: "completed" | "current" | "upcoming"
  date?: string
}

export type Application = {
  id: string
  country: string
  flag: string
  visaType: string
  reference: string
  progress: number
  status: string
  risk: RiskLevel
  submitted: string
  estimatedDecision: string
  stages: ApplicationStage[]
}

export const applications: Application[] = [
  {
    id: "app-ca",
    country: "Canada",
    flag: "🇨🇦",
    visaType: "Express Entry (PR)",
    reference: "VP-CA-48213",
    progress: 65,
    status: "Documents Under Review",
    risk: "Low",
    submitted: "12 Feb 2026",
    estimatedDecision: "Aug 2026",
    stages: [
      { name: "Profile Created", status: "completed", date: "02 Feb" },
      { name: "ITA Received", status: "completed", date: "10 Feb" },
      { name: "Application Submitted", status: "completed", date: "12 Feb" },
      { name: "Document Review", status: "current", date: "In progress" },
      { name: "Decision", status: "upcoming" },
    ],
  },
  {
    id: "app-au",
    country: "Australia",
    flag: "🇦🇺",
    visaType: "Subclass 189 (PR)",
    reference: "VP-AU-77104",
    progress: 30,
    status: "Skills Assessment",
    risk: "Moderate",
    submitted: "28 Jan 2026",
    estimatedDecision: "Nov 2026",
    stages: [
      { name: "EOI Submitted", status: "completed", date: "20 Jan" },
      { name: "Skills Assessment", status: "current", date: "In progress" },
      { name: "Invitation to Apply", status: "upcoming" },
      { name: "Application Lodged", status: "upcoming" },
      { name: "Decision", status: "upcoming" },
    ],
  },
  {
    id: "app-de",
    country: "Germany",
    flag: "🇩🇪",
    visaType: "Opportunity Card",
    reference: "VP-DE-30988",
    progress: 90,
    status: "Awaiting Decision",
    risk: "Low",
    submitted: "05 Jan 2026",
    estimatedDecision: "Mar 2026",
    stages: [
      { name: "Eligibility Check", status: "completed", date: "28 Dec" },
      { name: "Documents Verified", status: "completed", date: "03 Jan" },
      { name: "Application Submitted", status: "completed", date: "05 Jan" },
      { name: "Embassy Review", status: "completed", date: "20 Feb" },
      { name: "Decision", status: "current", date: "Expected soon" },
    ],
  },
]

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/eligibility", label: "Eligibility" },
  { href: "/recommendations", label: "Recommendations" },
  { href: "/checklist", label: "Checklist" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/chat", label: "Assistant" },
]

export function riskColor(risk: RiskLevel) {
  switch (risk) {
    case "Low":
      return "bg-chart-2/15 text-chart-2 border-chart-2/30"
    case "Moderate":
      return "bg-chart-3/15 text-chart-3 border-chart-3/30"
    case "High":
      return "bg-destructive/15 text-destructive border-destructive/30"
  }
}
