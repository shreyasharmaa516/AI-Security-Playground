from fastapi import FastAPI
from app.schemas.prompt import PromptRequest
from app.services.analyzer import analyze_prompt
from app.schemas.response import AnalysisResponse

app = FastAPI(
    title="SentinelAI",
    description="AI Security Evaluation Platform",
    version="1.0.0"
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