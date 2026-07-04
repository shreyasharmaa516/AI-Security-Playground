from fastapi import FastAPI
from app.schemas.prompt import PromptRequest
from app.services.analyzer import analyze_prompt
from app.schemas.response import AnalysisResponse
from app.config.settings import settings
from fastapi.middleware.cors import CORSMiddleware

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