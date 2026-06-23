from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/recommendations", tags=["Recommendations"])


class RecommendationRequest(BaseModel):
    nationality: str
    destination_country: str | None = None
    purpose: str
    education_level: str | None = None
    work_experience_years: int | None = 0
    budget: int | None = 0


@router.post("/")
def get_recommendations(data: RecommendationRequest):
    return {
        "profile": data.model_dump(),
        "recommended_visas": [
            {
                "country": "Germany",
                "visa": "Opportunity Card",
                "suitability_score": 86,
                "processing_time": "4-12 weeks",
                "estimated_cost": "€75+",
                "reason": "Good option for skilled graduates looking for employment in Germany."
            },
            {
                "country": "United Kingdom",
                "visa": "Skilled Worker Visa",
                "suitability_score": 78,
                "processing_time": "3-8 weeks",
                "estimated_cost": "£719+",
                "reason": "Suitable if the applicant has a UK employer sponsor."
            },
            {
                "country": "Canada",
                "visa": "Express Entry",
                "suitability_score": 70,
                "processing_time": "6-12 months",
                "estimated_cost": "CAD 1,365+",
                "reason": "Long-term PR route for skilled workers with strong points profile."
            }
        ]
    }