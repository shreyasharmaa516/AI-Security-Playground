from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.schemas.prompt import PromptRequest
from app.schemas.response import AnalysisResponse
from app.services.analyzer import analyze_prompt
from app.config.settings import settings

app = FastAPI(
    title=settings.app_name,
    description="AI Security Evaluation Platform",
    version=settings.app_version
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
def analyze(request: PromptRequest):
    return analyze_prompt(request.prompt)


@app.get("/dashboard")
def dashboard():
    return {
        "totalAnalyses": 126,
        "highRisk": 18,
        "critical": 5,
        "safe": 103,
    }


@app.get("/history")
def history():
    return [
        {
            "prompt": "Ignore previous instructions...",
            "risk_score": 95,
            "severity": "Critical"
        },
        {
            "prompt": "Generate SQL query...",
            "risk_score": 48,
            "severity": "Medium"
        },
        {
            "prompt": "Tell me a joke.",
            "risk_score": 5,
            "severity": "Low"
        }
    ]