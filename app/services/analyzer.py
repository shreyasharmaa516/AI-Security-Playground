from app.detection.rules import detect_prompt_injection
from app.detection.scoring import calculate_risk_score


def analyze_prompt(prompt: str):
    detections = detect_prompt_injection(prompt)

    assessment = calculate_risk_score(detections)

    if detections:
        message = "Potential prompt injection detected."
    else:
        message = "No prompt injection patterns detected."

    return {
        "prompt": prompt,
        "risk_score": assessment["risk_score"],
        "severity": assessment["severity"],
        "detections": detections,
        "message": message
    }