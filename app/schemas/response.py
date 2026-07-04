from pydantic import BaseModel


class Detection(BaseModel):
    rule: str
    severity: str
    score: int
    description: str


class AnalysisResponse(BaseModel):
    prompt: str
    risk_score: int
    severity: str
    detections: list[Detection]
    message: str