SEVERITY_SCORES = {
    "Critical": 100,
    "High": 90,
    "Medium": 70,
    "Low": 30,
    "Info": 10
}


def calculate_risk_score(detections: list):
    if not detections:
        return {
            "risk_score": 10,
            "severity": "Low"
        }

    highest = max(
        detections,
        key=lambda detection: detection["score"]
    )

    return {
        "risk_score": highest["score"],
        "severity": highest["severity"]
    }