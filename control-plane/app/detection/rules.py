from app.detection.types import Severity
from app.detection.findings import PROMPT_INJECTION

PROMPT_INJECTION_RULES = {
    "ignore previous instructions": {
        "severity": Severity.HIGH,
        "score": 90,
        "owasp": "LLM01: Prompt Injection",
        "description": "Attempts to override previous instructions.",
    },
    "system prompt": {
        "severity": Severity.HIGH,
        "score": 90,
        "owasp": "LLM07: System Prompt Leakage",
        "description": "Attempts to reveal the system prompt.",
    },
    "developer mode": {
        "severity": Severity.MEDIUM,
        "score": 70,
        "owasp": "LLM01: Prompt Injection",
        "description": "Attempts to enter developer mode.",
    },
    "jailbreak": {
        "severity": Severity.CRITICAL,
        "score": 100,
        "owasp": "LLM01: Prompt Injection",
        "description": "Known jailbreak attempt.",
    },
    "dan": {
        "severity": Severity.CRITICAL,
        "score": 100,
        "owasp": "LLM01: Prompt Injection",
        "description": "Attempts to invoke DAN jailbreak.",
    },
    "bypass": {
        "severity": Severity.MEDIUM,
        "score": 60,
        "owasp": "LLM01: Prompt Injection",
        "description": "Attempts to bypass restrictions.",
    },
    "forget your instructions": {
        "severity": Severity.HIGH,
        "score": 90,
        "owasp": "LLM01: Prompt Injection",
        "description": "Attempts to ignore original instructions.",
    },
}


def detect_prompt_injection(prompt: str):
    prompt_lower = prompt.lower()

    detections = []

    for keyword, details in PROMPT_INJECTION_RULES.items():
        if keyword in prompt_lower:
            detections.append(
                {
                    "id": PROMPT_INJECTION["id"],
                    "name": PROMPT_INJECTION["name"],
                    "category": PROMPT_INJECTION["category"],
                    "rule": keyword,
                    "severity": details["severity"],
                    "score": details["score"],
                    "description": details["description"],
                    "owasp": details["owasp"],
                    "recommendation": PROMPT_INJECTION["recommendation"],
                }
            )

    return detections
