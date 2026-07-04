from pydantic import BaseModel


class Detection(BaseModel):
    id: str
    name: str
    category: str
    rule: str
    severity: str
    score: int
    description: str
    recommendation: str


class AnalysisResponse(BaseModel):
    prompt: str
    risk_score: int
    severity: str
    detections: list[Detection]
    message: str