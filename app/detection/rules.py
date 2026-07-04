from app.detection.types import Severity
from app.detection.findings import PROMPT_INJECTION

PROMPT_INJECTION_RULES = {
    "ignore previous instructions": {
        "severity": Severity.HIGH,
        "score": 90,
        "description": "Attempts to override previous instructions."
    },
    "system prompt": {
        "severity": Severity.HIGH,
        "score": 90,
        "description": "Attempts to reveal the system prompt."
    },
    "developer mode": {
        "severity": Severity.MEDIUM,
        "score": 70,
        "description": "Attempts to enter developer mode."
    },
    "jailbreak": {
        "severity": Severity.CRITICAL,
        "score": 100,
        "description": "Known jailbreak attempt."
    },
    "dan": {
        "severity": Severity.CRITICAL,
        "score": 100,
        "description": "Attempts to invoke DAN jailbreak."
    },
    "bypass": {
        "severity": Severity.MEDIUM,
        "score": 60,
        "description": "Attempts to bypass restrictions."
    },
    "forget your instructions": {
        "severity": Severity.HIGH,
        "score": 90,
        "description": "Attempts to ignore original instructions."
    }
}

def detect_prompt_injection(prompt: str):
    prompt_lower = prompt.lower()

    detections = []

    for keyword, details in PROMPT_INJECTION_RULES.items():
        if keyword in prompt_lower:
            detections.append({
                "id": PROMPT_INJECTION["id"],
                "name": PROMPT_INJECTION["name"],
                "category": PROMPT_INJECTION["category"],
                "rule": keyword,
                "severity": details["severity"],
                "score": details["score"],
                "description": details["description"],
                "recommendation": PROMPT_INJECTION["recommendation"]
            })

    return detections