from pydantic import BaseModel


class Detection(BaseModel):
    id: str
    name: str
    category: str
    rule: str
    severity: str
    score: int
    description: str
    owasp: str | None = None
    recommendation: str


class AnalysisResponse(BaseModel):
    prompt: str
    risk_score: int
    severity: str
    ai_confidence: float | None = None
    detections: list[Detection]
    message: str
