from fastapi import FastAPI
from app.routers import eligibility, recommendations, applications

app = FastAPI(
    title="VisaPilot AI API",
    version="0.1.0"
)

app.include_router(eligibility.router)
app.include_router(recommendations.router)
app.include_router(applications.router)


@app.get("/")
def root():
    return {
        "status": "running",
        "service": "VisaPilot AI"
    }