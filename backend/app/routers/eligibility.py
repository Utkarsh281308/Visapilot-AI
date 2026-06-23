from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/eligibility", tags=["Eligibility"])


class EligibilityRequest(BaseModel):
    nationality: str
    destination_country: str
    purpose: str
    age: int
    education_level: str | None = None
    work_experience_years: int | None = 0
    budget: int | None = 0


@router.post("/check")
def check_eligibility(data: EligibilityRequest):
    return {
        "recommended_visa": "Germany Opportunity Card",
        "destination_country": data.destination_country,
        "eligibility_score": 82,
        "approval_probability": 74,
        "risk_level": "Medium",
        "summary": "You may be suitable for a skilled migration or job-seeker visa route.",
        "recommended_documents": [
            "Passport",
            "Degree certificate",
            "CV",
            "Proof of funds",
            "Work experience letter"
        ]
    }