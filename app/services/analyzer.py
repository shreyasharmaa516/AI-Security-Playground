from app.detection.rules import detect_prompt_injection


def analyze_prompt(prompt: str):
    detections = detect_prompt_injection(prompt)

    if detections:
        highest_score = max(d["score"] for d in detections)
        highest_severity = max(
            detections,
            key=lambda d: d["score"]
        )["severity"]

        message = "Potential prompt injection detected."

    else:
        highest_score = 10
        highest_severity = "Low"
        message = "No prompt injection patterns detected."

    return {
        "prompt": prompt,
        "risk_score": highest_score,
        "severity": highest_severity,
        "detections": detections,
        "message": message
    }