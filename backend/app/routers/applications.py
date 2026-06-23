from fastapi import APIRouter

router = APIRouter(prefix="/applications", tags=["Applications"])


@router.get("/{application_id}/tracking")
def get_application_tracking(application_id: str):
    return {
        "application_id": application_id,
        "current_status": "Under Review",
        "progress_percentage": 60,
        "timeline": [
            {
                "stage": "Application Started",
                "description": "User created the visa application profile.",
                "completed": True
            },
            {
                "stage": "Documents Checked",
                "description": "Required documents were reviewed by VisaPilot AI.",
                "completed": True
            },
            {
                "stage": "Appointment Scheduled",
                "description": "Biometrics or visa appointment has been scheduled.",
                "completed": True
            },
            {
                "stage": "Under Review",
                "description": "Application is currently being reviewed.",
                "completed": True
            },
            {
                "stage": "Decision Ready",
                "description": "Final visa decision is pending.",
                "completed": False
            }
        ]
    }