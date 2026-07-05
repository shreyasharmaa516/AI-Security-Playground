from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.config.settings import settings
from app.database.database import Base, SessionLocal, engine
from app.models.analysis import Analysis

from app.schemas.prompt import PromptRequest
from app.schemas.response import AnalysisResponse

from app.services.analyzer import analyze_prompt
from app.services.history_service import (
    save_analysis,
    get_all_analyses,
    get_dashboard_stats,
)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.app_name,
    description="AI Security Evaluation Platform",
    version=settings.app_version,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def root():
    return {
        "message": "Welcome to SentinelAI"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.post("/analyze", response_model=AnalysisResponse)
def analyze(
    request: PromptRequest,
    db: Session = Depends(get_db),
):
    result = analyze_prompt(request.prompt)

    save_analysis(
        db=db,
        prompt=result["prompt"],
        risk_score=result["risk_score"],
        severity=result["severity"],
        message=result["message"],
    )

    return result


@app.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db),
):
    return get_dashboard_stats(db)


@app.get("/history")
def history(
    db: Session = Depends(get_db),
):
    return get_all_analyses(db)