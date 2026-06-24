from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import eligibility, recommendations, applications

app = FastAPI(
    title="VisaPilot AI API",
    version="0.1.0"
)

app.include_router(eligibility.router)
app.include_router(recommendations.router)
app.include_router(applications.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "status": "running",
        "service": "VisaPilot AI"
    }




