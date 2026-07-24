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
    id: int

    prompt: str

    risk_score: int

    severity: str

    ai_confidence: float | None = None

    message: str

    business_impact: str

    attack_scenario: str

    owasp: str

    recommendations: list[str]

    secure_prompt: str

    detections: list[Detection]
